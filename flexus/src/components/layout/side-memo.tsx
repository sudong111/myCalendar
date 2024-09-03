interface SideMemoProps {
    show: boolean;
}

export default function SideMemo({ show } : SideMemoProps) {
    return (
        <div className={show ? 'side-on' : 'side-off'}>
    test
        </div>
    )
}