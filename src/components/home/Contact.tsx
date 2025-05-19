import React from 'react'
import Button from '../Button';
import Image from 'next/image';

const ImageClipBox = ({ src, alt, clipClass, width, height }) => (
    <div className={clipClass}>
        <Image src={src} alt={alt} width={width} height={height} />
    </div>
);

const Contact = () => {
    return (
        <div id="contact" className="my-20 min-h-96 w-screen px-10">
            <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
                <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
                    <ImageClipBox 
                        src="/images/contact-1.webp"
                        clipClass="contact-clip-path-1"
                        alt="alt-1"
                        width={1000}
                        height={683}
                    />
                    <ImageClipBox 
                        src="/images/contact-2.webp"
                        clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
                        alt="alt-2"
                        width={1282}
                        height={814}
                    />
                </div>

                <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
                    <ImageClipBox 
                        src="/images/swordman-partial.webp"
                        clipClass="absolute md:scale-125"
                        alt="alt-swordman-partial"
                        width={1286}
                        height={1582}
                    />
                    <ImageClipBox 
                        src="/images/swordman.webp"
                        clipClass="sword-man-clip-path md:scale-125"
                        alt="alt-swordman"
                        width={1286}
                        height={1582}
                    />
                </div>

                <div className="flex flex-col items-center text-center">
                    <p className="font-general text-[10px] uppercase">Join Raijin</p>
                    <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem]">
                        Let&apos;s B<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether
                    </p>

                    <Button 
                        id="contact-us"
                        title="Contact us"
                        containerClass="mt-10 cursor-pointer"
                        rightIcon
                        leftIcon
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;