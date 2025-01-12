import { ReactNode, useState } from "react";

export interface TabWidgetProps {
    widgets: TabWidget[];
}

export interface TabWidget {
    key: string;
    label: ReactNode;
    view: () => ReactNode;
}

export function TabWidget({ widgets }: TabWidgetProps) {
    const [widget, setWidget] = useState<TabWidget>(widgets[0]);
    return (
        <>
            <div className="tabs">
                {
                    widgets.map(_ => (
                        <div className={`tab ${widget.key === _.key ? 'active' : ''}`} key={`widget_${_.key}`} onClick={() => setWidget(_)}>
                            {_.label}
                        </div>
                    ))
                }
            </div>
            <div className="content" style={{ height: '100%', overflowY: 'auto' }}>
                {widget.view()}
            </div>
        </>
    )
}