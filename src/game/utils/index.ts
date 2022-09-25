import { Element } from '../types';

function getRandomBetween(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomFrom(...args: unknown[]) {
    const index = Math.floor(Math.random() * args.length);
    return args[index];
}

function isOverElement(firstElement: Element, secondElement: Element) {
    return (
        firstElement.x >= secondElement.x &&
        firstElement.x + firstElement.width <= secondElement.x + secondElement.width &&
        firstElement.y >= secondElement.y &&
        firstElement.y + firstElement.height <= secondElement.y + secondElement.height
    );
}

export { getRandomBetween, getRandomFrom, isOverElement };
