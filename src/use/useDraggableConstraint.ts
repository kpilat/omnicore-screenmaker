/**
 * 
 * @param position Enter current object position
 * @param targetSize Enter dragged target size
 * @param offset Offset from window edges (default: top: 0, right: 0, bottom: 0, left: 0)
 * * Possibility to import Offset type
 */

export function useDraggableConstraint(
    position: { x: number; y: number },
    targetSize: { width: number; height: number },
    offset: Offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
): void {
    position.x = xPosition(position.x, targetSize.width, offset)
    position.y = yPosition(position.y, targetSize.height, offset)
}

export function isWithinBoundaries(
    position: { x: number; y: number },
    targetSize: { width: number; height: number },
    offset: Offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
): boolean {
    return isWithinX(position.x, targetSize.width, offset) && isWithinY(position.y, targetSize.height, offset)
}

const isWithinX = (position: number, targetWidth: number, offset: Offset): boolean => {
    return position >= offset.left && position + targetWidth < offset.right
}

const isWithinY = (position: number, targetHeight: number, offset: Offset): boolean => {
    return position > offset.top && position + targetHeight < offset.bottom
}

const xPosition = (position: number, targetWidth: number, offset: Offset): number => {
    if (position < 0 + offset.left) return 0 + offset.left
    if (position > window.innerWidth - targetWidth - offset.right) return window.innerWidth - targetWidth - offset.right
    return position
}

const yPosition = (position: number, targetHeight: number, offset: Offset): number => {
    if (position < 0 + offset.top) return 0 + offset.top
    if (position > window.innerHeight - targetHeight - offset.bottom) return window.innerHeight - targetHeight - offset.bottom
    return position
}

export declare type Offset = {
    top: number; right: number; bottom: number; left: number
}

export default { useDraggableConstraint }