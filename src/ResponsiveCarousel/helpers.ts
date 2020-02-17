import { SlideStep } from "./ResponsiveCarousel"

export type CalculatedData = {
    stepPositions: number[],
    columnWidth: number
}


export const calcCarouselRenderData = ({containerWidth, minColumnWidth, columnsTotal, slideStep, adaptiveEnd}: {containerWidth: number, minColumnWidth: number, columnsTotal: number, slideStep: SlideStep, adaptiveEnd: boolean}) :CalculatedData => {
    const columnsInView = calcNumberOfColsInView(containerWidth, minColumnWidth)
    const columnWidth = calcColWidth(containerWidth, columnsInView)
    const stepPositions: number[] = calcStepPositions(columnsInView, columnsTotal, columnWidth, slideStep, adaptiveEnd)
    return {
        stepPositions,
        columnWidth
    }
}


const calcStepPositions = (colsInView: number, colsTotal: number, colWidth: number, slideStep: SlideStep, adaptiveEnd: boolean) => {
    const stepPositions = []
    const colsInStep = slideStep === 'max' ? colsInView : 1
    const stepsInView = colsInView / colsInStep
    const stepsTotal = Math.ceil(colsTotal/colsInStep) - stepsInView 
    for ( let i=0; i <= stepsTotal; i++ ) {  
        let stepPosition
        if( i === stepsTotal && adaptiveEnd) {
            const lastViewColumnsEmpty = colsInView + (colsInStep * stepsTotal) - colsTotal
            const lastViewColumnsEmptySpace =  lastViewColumnsEmpty * colWidth
            stepPosition =  calcStepPos(i, colWidth * colsInStep) - lastViewColumnsEmptySpace
        } else {
            stepPosition =  calcStepPos(i, colWidth * colsInStep)
        }
        stepPositions.push(stepPosition)    
    }
    return stepPositions
}


const calcNumberOfColsInView = (containerWidth: number, minWidth: number) => {
    return Math.floor(containerWidth/minWidth) || 1
}

const calcColWidth = (containerWidth: number, colsInView: number) => {
    return containerWidth/colsInView
}

const calcStepPos = (currentStep: number, colWidth: number) => {
    return currentStep * colWidth
}