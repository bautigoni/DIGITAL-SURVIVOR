export const createRng = (seed) => {
    let state = seed >>> 0;
    const next = () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const int = (min, max) => {
        const lo = Math.ceil(min);
        const hi = Math.floor(max);
        return Math.floor(next() * (hi - lo + 1)) + lo;
    };
    const pick = (items) => {
        if (items.length === 0)
            throw new Error('Cannot pick from empty array');
        return items[int(0, items.length - 1)];
    };
    const weighted = (items) => {
        if (items.length === 0)
            throw new Error('Cannot pick from empty weighted array');
        const total = items.reduce((s, i) => s + Math.max(0, i.weight), 0);
        let r = next() * total;
        for (const { item, weight } of items) {
            r -= Math.max(0, weight);
            if (r <= 0)
                return item;
        }
        return items[items.length - 1].item;
    };
    const shuffle = (items) => {
        const arr = items.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = int(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };
    return { next, int, pick, weighted, shuffle };
};
