export const checkSurvival = (stats) => {
    if (stats.security <= 0)
        return { alive: false, reason: 'security_collapsed', warning: 'critical' };
    if (stats.reputation <= 0)
        return { alive: false, reason: 'reputation_collapsed', warning: 'critical' };
    if (stats.money <= 0)
        return { alive: false, reason: 'money_collapsed', warning: 'critical' };
    if (stats.trust <= 0)
        return { alive: false, reason: 'trust_collapsed', warning: 'critical' };
    if (stats.time <= 0)
        return { alive: false, reason: 'time_collapsed', warning: 'critical' };
    if (stats.stress >= 100)
        return { alive: false, reason: 'stress_overload', warning: 'critical' };
    const minStat = Math.min(stats.security, stats.reputation, stats.money, stats.trust, stats.time);
    const warning = minStat <= 15 ? 'critical' : minStat <= 30 ? 'low' : 'ok';
    return { alive: true, reason: null, warning };
};
