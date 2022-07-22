export default function usePositionConstraint(
    position: { x: number; y: number },
    targetSize: { width: number; height: number }
): void {
    position.x = xPosition(position.x, targetSize.width)
    position.y = yPosition(position.y, targetSize.height)
}

const xPosition = (position: number, targetWidth: number): number => {
    if (position < 0) return 0
    if (position > window.innerWidth - targetWidth) return window.innerWidth - targetWidth
    return position
}

const yPosition = (position: number, targetHeight: number): number => {
    if (position < 0) return 0
    if (position > window.innerHeight - targetHeight) return window.innerHeight - targetHeight
    return position
}