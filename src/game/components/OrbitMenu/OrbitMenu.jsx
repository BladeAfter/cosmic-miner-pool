import "./OrbitMenu.css";
import {
  ShoppingCart,
  Waves,
  Target,
  Wallet,
} from "lucide-react";

export default function OrbitMenu() {
  return (
    <>
      <button className="orbit-btn shop">
        <ShoppingCart size={28} />
        <span>Loja</span>
      </button>

      <button className="orbit-btn pool">
        <Waves size={28} />
        <span>Pool</span>
      </button>

      <button className="orbit-btn missions">
        <Target size={28} />
        <span>Missões</span>
      </button>

      <button className="orbit-btn wallet">
        <Wallet size={28} />
        <span>Wallet</span>
      </button>
    </>
  );
}