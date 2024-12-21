import { Clock, Plus } from "lucide-react";
import { type FC } from "react";
import Button from "@/components/custom/Button";

type HeaderProps = {
  onAddTimeClick: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  const { onAddTimeClick } = props;

  return (<header className="flex justify-between">
    <div className="flex items-center gap-3">
      <Clock className="w-8 h-8 text-blue-600" />
      <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
    </div>
    <Button onClick={onAddTimeClick}>
      <Plus className="w-5 h-5" />
      Add Timer
    </Button>
  </header>)
}

export default Header;