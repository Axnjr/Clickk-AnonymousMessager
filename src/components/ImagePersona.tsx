"use client"
import { useEffect } from "react";

export default function ImagePersona() {

    // useEffect(() => {
    //     if (document) {

    //         function transforms(x: number, y: number, el: { getBoundingClientRect: () => any; }) {
    //             let box = el.getBoundingClientRect();
    //             let calcX = -(y - box.y - (box.height / 2)) / constrain;
    //             let calcY = (x - box.x - (box.width / 2)) / constrain;

    //             return "perspective(100px) "
    //                 // + "   rotateX(" + calcX + "deg) "
    //                 + "   rotateY(" + calcY + "deg) ";
    //         };

    //         function transformElement(el: HTMLElement | null, xyEl: [x: any, y: any, el: any] | number[]) {
    //             // @ts-ignore
    //             el.style.transform = transforms.apply(null, xyEl);
    //         }

    //         let constrain = 150;
    //         let ex1Layer = document.getElementById("card");
    //         let ex2Layer = document.getElementById("card2");
    //         let ex3Layer = document.getElementById("card3");

    //         try {
    //             document.body.onmousemove = (e) => {
    //                 let xy = [e.clientX, e.clientY];
    //                 // @ts-ignore
    //                 let position = xy.concat([ex1Layer]);

    //                 window.requestAnimationFrame(function () {
    //                     transformElement(ex1Layer, position);
    //                     transformElement(ex2Layer, position);
    //                     transformElement(ex3Layer, position);
    //                 });
    //             }
    //         } catch (error) { }
    //     }
    // })

    return (
        <section id="card_con" className="w-screen md:w-9/12 m-auto h-full overflow-hidden relative ">
            <div className="m-auto w-full h-full realtive grid place-items-end pr-8">
                <figure className="absolute px-[20%] top-20 md:top-32">
                    <img id="card" className="rounded-xl w-48 object-contain h-[420px]" src="https://firebasestorage.googleapis.com/v0/b/axn-myportfolio.appspot.com/o/siteAsset1.png?alt=media&token=a50a3850-b6ba-40ea-917e-e23862038859&_gl=1*cvtnyf*_ga*MTk1NDc2MjUxNi4xNjk0MjM1MTY0*_ga_CW55HF8NVT*MTY5ODgwNDA1NC4yMC4xLjE2OTg4MDQxMTcuNjAuMC4w" alt="" />
                    <img id="card2" className="w-40 h-40 absolute top-[58%]  left-[2%]" src="https://api.blog.production.linktr.ee/wp-content/themes/blog-theme/static-assets/Caterpiller/social-1.svg" alt="" />
                    <img id="card3" className="w-32 h-12 absolute left-[61%] top-[20%]" src="https://api.blog.production.linktr.ee/wp-content/themes/blog-theme/static-assets/Caterpiller/link.svg" alt="" />
                </figure>
            </div>
        </section>
    )
}