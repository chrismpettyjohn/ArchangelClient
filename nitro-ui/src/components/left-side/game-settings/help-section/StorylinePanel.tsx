import { Text } from "../../../../common";
import { CITY_NAME } from "../../../../constant";

export function StorylinePanel() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            <Text bold fontSize={4} variant="white">Storyline</Text>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                <img src="https://i.imgur.com/QQN3WuG.png" alt={`City of ${CITY_NAME}`} style={{ width: 250, objectFit: 'cover' }} />
                <p>
                    In the city of <strong>{CITY_NAME}</strong>, an iron-fisted government known as <strong>The Sovereign Authority (SA)</strong>
                    controls nearly every aspect of life. Originally promising "order and prosperity," the SA now rules with an iron grip,
                    enforcing strict laws and silencing any dissent. Over the years, these policies have widened the gap between the wealthy
                    elite and the struggling working class, fueling widespread resentment and whispers of rebellion.
                </p>
            </div>
            <br />

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                <p>
                    Amid the turmoil, the <strong>Liberation Front (LF)</strong> has emerged as a beacon of hope for the oppressed.
                    This group, composed of disillusioned former SA officials, activists, and common citizens, fights for a vision of freedom
                    from the SA's control. Yet, not all factions within the LF agree on tactics—some push for peaceful demonstrations, while
                    others resort to more aggressive measures, risking everything for the promise of a better future.
                </p>
                <img src="https://i.imgur.com/Nu7PNbz.png" alt="Liberation Front members" style={{ width: 250, objectFit: 'cover' }} />
            </div>
            <br />

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                <img src="https://i.imgur.com/k8tZEml.png" alt="Sovereign Authority patrols" style={{ width: 250, objectFit: 'cover' }} />
                <p>
                    The SA has responded with a show of force, deploying elite soldiers, police patrols, and surveillance teams across the city.
                    For many, everyday life has become a balance between survival and resistance. Civilians are torn—some seek stability and
                    choose to support the SA, while others join the LF, hoping to upend the city’s corrupt system. Still, others simply try
                    to endure, navigating the complex landscape of shifting alliances and dangers.
                </p>
            </div>
            <br />


            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                <p>
                    Meanwhile, whispers spread of a neutral group known as the <strong>World Accord (WA)</strong> watching from afar.
                    The WA has not yet intervened but may step in if the humanitarian crisis in {CITY_NAME} worsens. For now,
                    their influence is merely a rumor, casting an uncertain shadow over the escalating conflict.
                </p>
                <img src="https://i.imgur.com/AxhLguv.png" alt="Liberation Front members" style={{ width: 250, objectFit: 'cover' }} />
            </div>
            <br />
        </div>
    )
}
