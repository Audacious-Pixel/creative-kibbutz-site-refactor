export function useScrollProgress(maxScroll: number = 150) {
    const scrollY = ref(0);
    const smoothProgress = ref(0);
    let rafId: number | null = null;
    let isAnimating = false;

    const rawProgress = computed(() => {
        return Math.min(Math.max(scrollY.value / maxScroll, 0), 1);
    });

    const updateScroll = () => {
        if (import.meta.client) {
            scrollY.value = window.scrollY;
        }
    };

    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
    };

    const animate = () => {
        smoothProgress.value = lerp(smoothProgress.value, rawProgress.value, 0.12);

        if (Math.abs(smoothProgress.value - rawProgress.value) > 0.0001) {
            rafId = requestAnimationFrame(animate);
        } else {
            smoothProgress.value = rawProgress.value;
            isAnimating = false;
            rafId = null;
        }
    };

    const handleScroll = () => {
        updateScroll();
        if (!isAnimating) {
            isAnimating = true;
            rafId = requestAnimationFrame(animate);
        }
    };

    onMounted(() => {
        if (import.meta.client) {
            updateScroll();
            smoothProgress.value = rawProgress.value;
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    });

    onBeforeUnmount(() => {
        if (import.meta.client) {
            window.removeEventListener('scroll', handleScroll);
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        }
    });

    return {
        progress: smoothProgress,
        rawProgress,
    };
}
