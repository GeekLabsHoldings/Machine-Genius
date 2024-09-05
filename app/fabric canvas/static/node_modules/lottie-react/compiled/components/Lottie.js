import { useEffect } from "react";
import useLottie from "../hooks/useLottie";
import useLottieInteractivity from "../hooks/useLottieInteractivity";
const Lottie = (props) => {
    var _a, _b, _c;
    const { style, interactivity, ...lottieProps } = props;
    /**
     * Initialize the 'useLottie' hook
     */
    const { View, play, stop, pause, setSpeed, goToAndStop, goToAndPlay, setDirection, playSegments, setSubframe, getDuration, destroy, animationContainerRef, animationLoaded, animationItem, } = useLottie(lottieProps, style);
    /**
     * Make the hook variables/methods available through the provided 'lottieRef'
     */
    useEffect(() => {
        if (props.lottieRef) {
            props.lottieRef.current = {
                play,
                stop,
                pause,
                setSpeed,
                goToAndPlay,
                goToAndStop,
                setDirection,
                playSegments,
                setSubframe,
                getDuration,
                destroy,
                animationContainerRef,
                animationLoaded,
                animationItem,
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(_a = props.lottieRef) === null || _a === void 0 ? void 0 : _a.current]);
    return useLottieInteractivity({
        lottieObj: {
            View,
            play,
            stop,
            pause,
            setSpeed,
            goToAndStop,
            goToAndPlay,
            setDirection,
            playSegments,
            setSubframe,
            getDuration,
            destroy,
            animationContainerRef,
            animationLoaded,
            animationItem,
        },
        actions: (_b = interactivity === null || interactivity === void 0 ? void 0 : interactivity.actions) !== null && _b !== void 0 ? _b : [],
        mode: (_c = interactivity === null || interactivity === void 0 ? void 0 : interactivity.mode) !== null && _c !== void 0 ? _c : "scroll",
    });
};
export default Lottie;
