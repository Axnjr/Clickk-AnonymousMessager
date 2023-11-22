"use client";
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/Button"
import Loading from '@/app/loading';
import { UploadToFirebase } from '../../lib/firebaseCdnHelper';
import { useAllDataFromUserContext } from '@/hooks/useDataFromUserContext';
import { trpc } from "@/app/_trpcUsageLib/client"

export default function SendVoiceMessage() {

    const data = useAllDataFromUserContext()
    const [status, setStatus] = useState<"speaking" | "not_speaking" | "loading">("not_speaking");
    const [audioBlob, setAudioBlob] = useState<any | null>(null);
    const [success, setSuccess] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const { mutate: postMessage } = trpc.postMessage.useMutation({
        onSuccess: () => {
            setSuccess(true);
            setStatus("not_speaking");
        },
        onError: (err) => { console.log("Unable to send message something went wrong !!", err) }
    })

    async function SaveUserAudioMessage() {
        setStatus("loading")
        const audioURLFromFirebase = await UploadToFirebase(audioBlob, "wav");
        let address;

        if(data.membership){
            let t = await (await fetch(`https://api.ipdata.co?api-key=acec1b92be56f29a548fbff3d240005eaf47a8fd6f3edc6cef3446db`)).json()
            address = `${t.continent_name} | ${t.country_name} | ${t.city}`
        }

        postMessage({
            userId: data.id,
            url: audioURLFromFirebase,
            type: "voice",
            ipAddress:address
        })
    }

    function startRecording(eve: React.MouseEvent<HTMLButtonElement>) {
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
                    setAudioBlob(audioBlob);
                };
            })
            .catch((error) => { console.error('Error accessing microphone:', error) });
    };

    function stopRecording() {
        if (mediaRecorderRef.current && status) {
            mediaRecorderRef.current.stop();
            setStatus("not_speaking");
        }
    };

    return (
        <>
            <div className='p-2 w-full flex items-center justify-center'>
                {
                    status === "not_speaking" && <button className='w-10/12 font-semibold 
                        h-12 bg-[#dedede] backdrop-blur-3xl text-neutral-800 rounded-2xl'
                        onClick={(e) => startRecording(e)}>
                        Record your message ✨
                    </button>
                }
                {
                    status === "speaking" && <button className='w-10/12 font-semibold 
                    h-12 bg-[#dedede] backdrop-blur-3xl text-neutral-800 rounded-2xl' onClick={stopRecording}>
                        Stop ⏹️
                    </button>
                }
                {
                    status === "loading" && <Loading type='small' message='' />
                }
            </div>
            {audioBlob && <audio className='m-auto w-10/12 my-3' controls>
                <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>}

            <div className="text-center inline-block">
                {
                    status != "loading" && <Button onClick={SaveUserAudioMessage} className="text-center w-full" type="submit">Send voice message</Button>
                }
                {
                    status == "loading" && <Button className="text-center w-full flex items-center">
                        Sending message <svg style={{ display: status == "loading" ? "block" : "none" }} className="animate-spin ml-2 h-4 w-4 text-white dark:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </Button>
                }
            </div>
        </>
    )
}