import './Button.css';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export const Button = ({onClick, children, text, variant="default", size="sm", style, loading}) => {
    const styles = `
        size_${size} button_${variant} button
        ${loading ? 'loading' : ''}
    `;
    return (
        <button onClick={onClick} className={styles} style={style} disabled={loading}>
            <LoadingSpinner/>
        </button>
    )
}