import lottie from "lottie-web";

function generateAnimation(
  animationRef: React.MutableRefObject<null>,
  path: string,
  speed: number
) {
  if (animationRef.current) {
    const anim = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg",
      path,
    });
    anim.setSpeed(speed);

    return anim;
  }

  return null;
}

export { generateAnimation };
