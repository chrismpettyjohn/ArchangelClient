import { NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { ChangePassword } from "./change-password/ChangePassword";
import { ChangeEmail } from "./change-email/ChangeEmail";
import { ManageMFA } from "./manage-mfa/ManageMFA";

export function SecurityPanel() {

    return (
        <NitroCardAccordionView fullHeight overflow="hidden">
            <NitroCardAccordionSetView headerText="Password" isExpanded>
                <ChangePassword />
            </NitroCardAccordionSetView>
            <NitroCardAccordionSetView headerText="Email Address">
                <ChangeEmail />
            </NitroCardAccordionSetView>
            <NitroCardAccordionSetView headerText="Multi-factor authentication">
                <ManageMFA />
            </NitroCardAccordionSetView>
        </NitroCardAccordionView>
    );
}
