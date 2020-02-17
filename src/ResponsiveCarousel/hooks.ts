import { useState, useEffect } from "react"
import { calcCarouselRenderData, CalculatedData } from "./helpers"
import { SlideStep } from "./ResponsiveCarousel"


export type UseCarouselCalculationsProps = {
    containerElement: HTMLDivElement | null,
    minColumnWidth: number,
    columnsTotal: number,
    slideStep: SlideStep,
    adaptiveEnd: boolean,
    windowWidth: number | undefined
}


export type UseCarouselCalculations = {
    goPrevStep: ()=>void, 
    goNextStep: ()=>void,
    goToStep: (step: number) => void,
    stripPosX:number, 
    colWidth:number,
    disablePrev: boolean,
    disableNext: boolean,
    showControls: boolean
}

const calculatedDataDefaults:CalculatedData = {
    stepPositions: [],
    columnWidth: 0
}



const useCarouselCalculations = ({containerElement, windowWidth, minColumnWidth, columnsTotal, slideStep, adaptiveEnd}: UseCarouselCalculationsProps): UseCarouselCalculations => {
    
    
    const [currentStep, setCurrentStep] = useState(0)
    const [calculatedData, setCalculatedData] = useState<CalculatedData>(calculatedDataDefaults)

    useEffect(()=>{
        const containerWidth = containerElement?.clientWidth || 0
        const calculatedData = calcCarouselRenderData({containerWidth, minColumnWidth, columnsTotal, slideStep, adaptiveEnd})
        setCalculatedData(calculatedData)
    },[windowWidth, containerElement, columnsTotal, minColumnWidth])


    
    const goToStep = (step: number) => {
        if(typeof calculatedData.stepPositions[step] !== 'undefined') {
            setCurrentStep(step)
        }
    } 
    const goPrevStep = () => {
        goToStep(currentStep - 1)
    }
    const goNextStep = () => {
        goToStep(currentStep + 1)
    }

    // console.log('calculatedData.stepPositions', calculatedData.stepPositions)

    return {
        goPrevStep,
        goNextStep,
        goToStep,
        stripPosX: calculatedData.stepPositions[currentStep],
        colWidth: calculatedData.columnWidth,
        disablePrev: currentStep === 0,
        disableNext: currentStep === calculatedData.stepPositions.length - 1,
        showControls: calculatedData.stepPositions.length !== 0
    }
}


export default useCarouselCalculations