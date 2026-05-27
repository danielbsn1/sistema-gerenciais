// resources/ts/components/Button.tsx
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@inertiajs/react";
import "../styles/components.css";

type Variant =
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "link"
    | "link-warning"
    | "link-danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
    variant?: Variant;
    size?: Size;
    children?: ReactNode;
    className?: string;
}

interface ButtonProps
    extends
        BaseProps,
        Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    as?: "button";
    href?: never;
}

interface LinkProps extends BaseProps {
    as: "link";
    href: string;
    method?: "get" | "post" | "put" | "patch" | "delete";
}

type Props = ButtonProps | LinkProps;

export default function Button({
    variant = "primary",
    size = "md",
    children,
    className = "",
    ...rest
}: Props) {
    const classes = [
        "btn",
        `btn--${variant}`,
        size !== "md" ? `btn--${size}` : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (rest.as === "link") {
        const { as, href, method = "get", ...linkRest } = rest as LinkProps;
        return (
            <Link
                href={href}
                method={method}
                className={classes}
                {...(linkRest as any)}
            >
                {children}
            </Link>
        );
    }

    const { as, href, ...btnRest } = rest as any;
    return (
        <button className={classes} {...btnRest}>
            {children}
        </button>
    );
}
