import Spline from '@splinetool/react-spline';

export default function HeroCore() {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <Spline
                scene="https://prod.spline.design/8x6jMMjJy1IO7Te6/scene.splinecode"
                style={{
                    width: '1200px',
                    height: '1200px',
                    transform: 'scale(0.45) translateX(36%) translateY(-40%)',
                    transformOrigin: 'center center',
                    display: 'flex'
                }}
            />
        </div>
    );
}