import { useState } from "react"
import { Text } from "../../../../common";
import ReactSlider from "react-slider";

export function SoundPanel() {
    const [volume, setVolume] = useState(100);
    return (
        <>
            <Text bold fontSize={4} variant="white">Volume ({volume}%)</Text>
            <ReactSlider
                className={'nitro-slider'}
                min={1}
                max={100}
                value={volume}
                onChange={event => setVolume(event)}
            />
        </>
    )
}