import { messageData } from "../../helper/data";

export default function UpgradFfeatureui() {
    return (
        <div className="w-full absolute hidden group-hover:block bottom-full mb-2 left-1/2 -translate-x-1/2 bg-linear-to-r from-black to-black dark:from-white dark:to-white text-white-dark  text-xs px-3 py-2 rounded-lg shadow-lg">
            {messageData.upgradeProMessage}
        </div>
    );
}