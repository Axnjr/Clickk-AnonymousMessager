"use client";
import { useState, useRef } from 'react';
import { Button } from '../ui/Button';
import { UploadToFirebase } from '../../lib/firebaseCdnHelper';
import { Fetcher } from '../../lib/utils';

export default function AudioRecorder({ user_id } : { user_id : string }) {
	const [recording, setRecording] = useState(false);
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const [success, setSuccess] = useState(false)
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

	

	const startRecording = (eve: React.MouseEvent<HTMLButtonElement>) => {
		setAudioUrl(null)
		mediaRecorderRef.current = null
		audioChunksRef.current = []
		eve.preventDefault()
		
		navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then((stream) => {
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) audioChunksRef.current.push(event.data)
			};
			mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
				
				const audioUrl = URL.createObjectURL(audioBlob);
				setAudioUrl(audioUrl);
			};
			mediaRecorderRef.current = mediaRecorder;
			mediaRecorder.start();
			setRecording(true);
		})
		.catch((error) => { console.error('Error accessing microphone:', error) });
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && recording) {
			mediaRecorderRef.current.stop();
			setRecording(false);
		}
	};
	
	return (
		<div className='my-2 text-center'>
			<div className='p-2 w-full flex items-center justify-center'>
				{
					!recording && <Button className='w-1/2 mr-1 font-semibold text-xl h-12' variant="secondary" onClick={(e) => startRecording(e)}>
						Speak ✨
					</Button>
				}
				{
					recording && <Button className='w-1/2 mr-1 font-semibold text-xl h-12' variant="secondary" onClick={stopRecording}>
						Stop ⏹️
					</Button>
				}
			</div>
			{
				audioUrl && <audio className='m-auto w-full mt-2' controls>
					<source src={audioUrl} type="audio/wav" />
						Your browser does not support the audio element.
				</audio>
			}
		</div>
	);
}