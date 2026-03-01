function StatsBar({ stats }) {
    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className="stats-bar">
            <div className="stat-card">
                <div className="stat-icon stat-icon-total">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                </div>
                <div className="stat-info">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Total</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon stat-icon-active">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                </div>
                <div className="stat-info">
                    <span className="stat-value">{stats.active}</span>
                    <span className="stat-label">Active</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon stat-icon-done">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>
                <div className="stat-info">
                    <span className="stat-value">{stats.completed}</span>
                    <span className="stat-label">Done</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon stat-icon-progress">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                </div>
                <div className="stat-info">
                    <span className="stat-value">{completionRate}%</span>
                    <span className="stat-label">Progress</span>
                </div>
            </div>
        </div>
    );
}

export default StatsBar;
