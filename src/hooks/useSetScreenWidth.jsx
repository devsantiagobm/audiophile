export default function useSetScreenWidth(){
    const screenWidth = window.screen.width;
    const sizes = [[572, "mobile"], [892, "tablet"]]
    const currentSize = sizes.find(([width]) => width >= screenWidth)
    return Boolean(currentSize) ? currentSize[1] : "desktop";
}