"use client";
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import Loading from '@/app/loading';
import { UploadToFirebase } from '../lib/firebaseCdnHelper';
import { useAllDataFromUserContext } from '@/hooks/useDataFromUserContext';

export default function SendVoiceMessage() {

    const data = useAllDataFromUserContext()
    const [status, setStatus] = useState<"speaking" | "not_speaking" | "loading">("not_speaking");
    const [audioBlob, setAudioBlob] = useState<any | null>(null);
    const [success, setSuccess] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    async function SaveUserAudioMessage() {
        const t  = await UploadToFirebase(audioBlob,"wav");
        await fetch(`/api/queryMessages?userId=${data.id}&type="voice"`,
            {
                method:"POST",
                body:JSON.stringify(t)
            }
        )
        .then(()  => { setSuccess(true) })
        .catch(() => { console.log("Unable to send message something went wrong !!") })
    }

    function startRecording(eve: React.MouseEvent<HTMLButtonElement>){
        setAudioBlob(null)
        mediaRecorderRef.current = null
        audioChunksRef.current = []
        eve.preventDefault()
    
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = (event) => { // @ts-ignore
                    if (event.data.size > 0) audioChunksRef.current.push(event.data)
                };

                mediaRecorderRef.current = mediaRecorder;
                mediaRecorder.start();

                setStatus(prev => "speaking");

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    // const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioBlob(audioBlob);
                };
            })
            .catch((error) => { console.error('Error accessing microphone:', error) });
    };

    function stopRecording(){
        if (mediaRecorderRef.current && status) {
            mediaRecorderRef.current.stop();
            setStatus("not_speaking");
        }
    };
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-2 w-3/5 h-12 text-lg font-medium rounded-xl">Send Voice Message</Button>
            </DialogTrigger>
            <DialogContent className="w-3/2 border border-white">
                {
                    success ? <h1 className="inline-block text-2xl tracking-tighter font-semibold">Your message sent successfully 😆↗️📫🙂</h1>
                        :
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-center">Send me anonymous voice message 📢</DialogTitle>
                        </DialogHeader>
                        <div className='my-2 text-center'>
                            <div className='p-2 w-full flex items-center justify-center'>
                                {
                                    status === "not_speaking" && <Button className='w-1/2 mr-1 font-semibold text-xl h-12' variant="secondary" 
                                        onClick={(e) => startRecording(e) }>
                                        Speak ✨
                                    </Button>
                                }
                                {
                                    status === "speaking" && <Button className='w-1/2 mr-1 font-semibold text-xl h-12' variant="secondary" onClick={stopRecording}>
                                        Stop ⏹️
                                    </Button>
                                }
                                {
                                    status === "loading" && <Loading type='small' message=''/>
                                }
                            </div>
                            {audioBlob && <audio className='m-auto w-full mt-2' controls>
                                <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                                Your browser does not support the audio element.
                            </audio>}
                        </div>
                        <DialogFooter className="text-center inline-block">
                            <Button className="text-center w-full" type="submit" onClick={SaveUserAudioMessage}>Send voice Message</Button>
                        </DialogFooter>
                    </>
                }
            </DialogContent>
        </Dialog>
    )
}