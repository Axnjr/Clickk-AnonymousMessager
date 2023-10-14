import { cn } from "../lib/utils";
import { HTMLProps } from "react";
export default function Loading({ type, className, message, }
	:
{ type: "small" | "big" | "medium" , className?: HTMLProps<HTMLElement>["className"], message ?: string, }) {
	return (
		 <>
			{
				type === "small" && <div className={cn("flex flex-col items-center justify-center w-full h-full text-center", className)}>
					<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
						<defs>
							<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
								<stop stopColor="#000" stopOpacity={0} offset="0%" />
								<stop stopColor="#000" stopOpacity=".631" offset="63.146%" />
								<stop stopColor="#000" offset="100%" />
							</linearGradient>
						</defs>
						<g fill="none" fillRule="evenodd">
							<g transform="translate(1 1)">
								<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={2}>
									<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
								</path>
								<circle fill="#000" cx={36} cy={18} r={1}>
									<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
								</circle>
							</g>
						</g>
					</svg>
					<h1 className="text-xs font-bold text-center mt-4">{message}</h1>
				</div>
			}
			{
				type === "medium" && <div className={cn("flex flex-col items-center justify-center w-full h-full text-center", className)}>
					<svg className="animate-spin w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
						<defs>
							<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
								<stop stopColor="#000" stopOpacity={0} offset="0%" />
								<stop stopColor="#000" stopOpacity=".631" offset="63.146%" />
								<stop stopColor="#000" offset="100%" />
							</linearGradient>
						</defs>
						<g fill="none" fillRule="evenodd">
							<g transform="translate(1 1)">
								<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={2}>
									<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
								</path>
								<circle fill="#000" cx={36} cy={18} r={1}>
									<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
								</circle>
							</g>
						</g>
					</svg>
					<h1 className="text-xs font-bold text-center mt-4">{message}</h1>
				</div>
			}
			{
				type === "big" && <div className={cn("bg-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-screen h-screen z-50 flex flex-col items-center justify-center", className)}>
					<svg className="animate-spin w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
						<defs>
							<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
								<stop stopColor="#000" stopOpacity={0} offset="0%" />
								<stop stopColor="#000" stopOpacity=".631" offset="63.146%" />
								<stop stopColor="#000" offset="100%" />
							</linearGradient>
						</defs>
						<g fill="none" fillRule="evenodd">
							<g transform="translate(1 1)">
								<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={2}>
									<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
								</path>
								<circle fill="#000" cx={36} cy={18} r={1}>
									<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
								</circle>
							</g>
						</g>
					</svg>
					<h1 className="text-xs font-semibold text-center mt-4">{message}</h1>
				</div>
			}
		</>
	)
}