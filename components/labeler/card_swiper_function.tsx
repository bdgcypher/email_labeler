import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type TProps = {
    contents: any;
    onSwipe?: Function;
    uuid?: string;
    className?: string;
    detectingSize?: number;
    throwLimit?: number;
};

export const CardSwiper = (props: TProps) => {
    const target = useRef<HTMLDivElement>(null);
    const x = useRef<number>(0);
    const y = useRef<number>(0);

    const mid = useRef<number>(0);

    const angleMax = 30;

    const getRotateOrigin = async (mx: number) => {
        let result: number[] = [];

        if (target.current !== null) {
            if (y.current < mid.current) {
                if (x.current > mx) {
                    result = [0, 100, -1];
                } else {
                    result = [100, 100, 1];
                }
            } else {
                if (x.current > mx) {
                    result = [0, 0, 1];
                } else {
                    result = [100, 0, -1];
                }
            }
            return result;
        } else {
            return undefined;
        }
    };

    const selectDirection = async (mx: number, my: number) => {
        if (mx - x.current > (props.detectingSize ?? 100)) {
            return "right";
        } else if (mx - x.current < -(props.detectingSize ?? 100)) {
            return "left";
        } else return "none";
    };

    const onStart = async (mx: number, my: number) => {
        x.current = mx;
        y.current = my;
    };
    const onMove = async (mx: number, my: number) => {
        if (target.current === null) return;
        const origin = await getRotateOrigin(mx);
        const angle =
            (Math.abs(mx - x.current) *
                angleMax *
                (1 - Math.abs(my - mid.current) / mid.current / 2)) /
            target.current?.offsetWidth;

        if (origin !== undefined) {
            gsap.to(target.current, {
                transformOrigin: `${origin[0]}% ${origin[1]}%`,
                x: (mx - x.current) * 0.2,
                rotation: origin[2] * angle,
                duration: 0,
            });
        }
    };

    const onEnd = async (mx: number, my: number) => {
        if (target.current === null) return;
        const mid = target.current?.offsetHeight / 2;
        const angle =
            (Math.abs(mx - x.current) * angleMax * (1 - Math.abs(my - mid) / mid)) /
            target.current?.offsetWidth;
        const d = await selectDirection(mx, my);
        const id = props.uuid;

        if (d === "right" || d === "left") {
            const tl = gsap.timeline();
            tl.to(target.current, {
                x: (mx - x.current > 0 ? 1 : -1) * (props.throwLimit ?? 1000) + "px",
                y:
                    (my - y.current > 0 ? 1 : -1) *
                    (props.throwLimit ?? 1000) *
                    Math.tan((angle * Math.PI) / 180) +
                    "px",
                duration: 0.5,
                ease: "power1.in",
            });
            tl.to(target.current, {
                display: "none",
                duration: 0,
            });
        } else {
            gsap.to(target.current, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        }

        x.current = 0;
        y.current = 0;

        await props.onSwipe?.(d, id);
    };

    const handleTouchStart = (e: any) => {
        const mx = e.targetTouches[0].clientX;
        const my = e.targetTouches[0].clientY;
        onStart(mx, my);
    };

    const handleTouchMove = (e: any) => {
        const mx = e.changedTouches[0].clientX;
        const my = 0;
        onMove(mx, my);
    };

    const handleTouchEnd = (e: any) => {
        const mx = e.changedTouches[0].clientX;
        const my = e.changedTouches[0].clientY;
        onEnd(mx, my);
    };

    const mouseClicked = useRef<Boolean>(false);

    const handleMouseDown = (e: any) => {
        mouseClicked.current = true;
        const mx = e.clientX;
        const my = e.clientY;
        onStart(mx, my);
    };

    const handleMouseMove = (e: any) => {
        if (mouseClicked.current) {
            const mx = e.clientX;
            const my = e.clientY;
            onMove(mx, my);
        }
    };

    const handleMouseUp = (e: any) => {
        if (mouseClicked.current) {
            mouseClicked.current = false;
            const mx = e.clientX;
            const my = e.clientY;
            onEnd(mx, my);
        }
    };

    const handleMouseLeave = (e: any) => {
        if (mouseClicked.current) {
            mouseClicked.current = false;
            const mx = e.clientX;
            const my = e.clientY;
            onEnd(mx, my);
        }
    };

    const handleKeyUp = (e: any) => {
        if (e.key === "ArrowLeft") {
            console.log("ArrowLeft");
            onEnd(-1000, -1000);
        } else if (e.key === "ArrowRight") {
            console.log("ArrowRight")
            onEnd(1000, 1000);
        };
    };

    useEffect(() => {
        const info = target.current?.getBoundingClientRect();
        if (info !== undefined) {
            mid.current = (info.top + info.bottom) / 2;
        }

        if (target.current !== null) {
            target.current.addEventListener("mousedown", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("mousemove", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("mouseup", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("mouseleave", (ev) => {
                ev.preventDefault();
            });

            // trying to add functionality for arrow key navigation
            // can't single out each card yet

            // window.addEventListener('keyup', function (ev) {
            //     if (ev.key === "ArrowLeft") {
            //         console.log("ArrowLeft");
            //         onEnd(-1000, -1000);
            //     } else if (ev.key === "ArrowRight") {
            //         console.log("ArrowRight")
            //         onEnd(1000, 1000);
            //     };
            // }, false);

        }
    }, []);
    return (
        <div
            ref={target}
            className={props.className ?? ""}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onKeyUp={handleKeyUp}
        >
            {props.contents}
        </div>
    );
};