import React, { useRef, useEffect, useState } from "react"
import styles from "./ResponsiveCarousel.module.css"
import useCarouselCalculations  from "./hooks"
import { useWindowSize } from "helpers/helpers"

export type SlideStep = 'min' | 'max'

type ResponsiveCorouselProps = {
    data: Array<any>,
    ItemComponent: typeof React.Component,
    keyPath: string,
    minWidth: number,
    maxWidth: number,
    slideStep: SlideStep,
    adaptiveEnd: boolean
}




const ResponsiveCarousel = ({
    data=[], 
    minWidth=100, 
    maxWidth=200, 
    ItemComponent, 
    keyPath, 
    slideStep = 'min',
    adaptiveEnd = false
}: ResponsiveCorouselProps) => {

    const containerRef = useRef<HTMLDivElement>(null)
    const windowSize = useWindowSize()
    const [disabledAnimation, setDisabledAnimation] = useState(false)


    const {goPrevStep, goNextStep, stripPosX, colWidth, disablePrev, disableNext, showControls} = useCarouselCalculations({containerElement: containerRef.current, windowWidth: windowSize.width, minColumnWidth: minWidth, columnsTotal: data.length, slideStep, adaptiveEnd})

    useEffect(()=>{
       setDisabledAnimation(true)
       setTimeout(()=>{setDisabledAnimation(false)},10)
    }, [windowSize.width])

    const disabledAnimationClass = disabledAnimation ? styles.disabledAnimation : ""
    
    return (
        <div className={`${styles.container} ${disabledAnimationClass}`}>
            {showControls &&  <ArrowLeft className={disablePrev ? styles.disabled : ""} onClick={goPrevStep} />}
            <div ref={containerRef} className={styles.contentContainer}>
                <div style={{left: -stripPosX + 'px'}} className={styles.itemStrip}>
                    {data.map((item, index)=>{
                        return (
                            <div style={{width: colWidth + 'px'}} key={item[keyPath] || index} className={styles.itemContainer}>
                                <ItemComponent data={item} index={index} />
                            </div>
                        )
                    })}
                </div>
            </div>
            {showControls &&  <ArrowRight className={disableNext ? styles.disabled : ""} onClick={goNextStep} />}
        </div>
    )
} 


const ArrowLeft = ({className = "", onClick}: {className: string, onClick: ()=>void}) => {
    return (
        <SliderButton className={className} onClick={onClick}>
                <svg viewBox="0 0 50 80">
                    <polyline fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/>
                </svg>  
        </SliderButton>
    )
}

const ArrowRight = ({className = "", onClick}: {className: string, onClick: ()=>void}) => {
    return (
        <SliderButton className={className} onClick={onClick}>
                <svg viewBox="0 0 50 80">
                    <polyline fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
                </svg>
        </SliderButton>
            
    )
}

const SliderButton = ({className = "", onClick, children}: {className: string, onClick: ()=>void, children: React.ReactNode}) => {
        return (
            <div className={styles.sliderButtonContainer}>
                <button className={`${className} ${styles.sliderButton}`} type="button" onClick={onClick}>
                    {children}
                </button>
            </div>
        )
}

export default ResponsiveCarousel