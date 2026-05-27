// resources/ts/components/Card.tsx
import { ReactNode } from "react";
import "../styles/components.css";

interface CardProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

interface SectionProps {
    children?: ReactNode;
    className?: string;
    /** Extra element on the right side of the header */
    action?: ReactNode;
    title?: string;
    subtitle?: string;
}

export function Card({ children, className = "", style }: CardProps) {
    return (
        <div className={`card ${className}`} style={style}>
            {children}
        </div>
    );
}

export function CardHeader({
    children,
    className = "",
    action,
    title,
    subtitle,
}: SectionProps) {
    if (title) {
        return (
            <div className={`card__header ${className}`}>
                <div className="card__header-left">
                    <div className="card__title">{title}</div>
                    {subtitle && (
                        <div className="card__subtitle">{subtitle}</div>
                    )}
                </div>
                {action && <div>{action}</div>}
                {children}
            </div>
        );
    }
    return (
        <div className={`card__header ${className}`}>
            {children}
            {action && <div>{action}</div>}
        </div>
    );
}

export function CardBody({ children, className = "" }: CardProps) {
    return <div className={`card__body ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardProps) {
    return <div className={`card__footer ${className}`}>{children}</div>;
}

export default Card;
