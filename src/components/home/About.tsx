"use client";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../AnimatedTitle';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });

        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0
        })
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <h2 className="font-general text-sm uppercase md:text-[10px]">
                    Welcome to Raijin Ascendancy
                </h2>

                <AnimatedTitle 
                    title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared competition"
                    containerClass="mt-5 !text-black text-center"
                />

                <div className="about-subtext">
                    <p>The Metagame begins-your life, now an epic competition</p>
                    <p className="text-gray-500">Raijin is the unified play layer driving competition and community through cross game and platform gamification.</p>
                </div>
            </div>

            <div id="clip" className="h-dvh w-screen">
                <div className="mask-clip-path about-image">
                    <Image
                        src="/images/about.webp"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"
                        width={3200}
                        height={1800}
                    />
                </div>
            </div>
        </div>
    );
};

export default About;