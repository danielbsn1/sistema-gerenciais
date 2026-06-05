import { FC } from "react";

interface TableProps {
    children: React.ReactNode;
}

const Table: FC<TableProps> = ({ children }) => {
    return <table className="table">{children}</table>;
};

export default Table;
