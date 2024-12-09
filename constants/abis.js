import RWA from "./abis/RWA.json";
import SecurityLayer from "./abis/SecurityLayer.json";
import FeeCollector from "./abis/FeeCollector.json";
import TransferManager from "./abis/TransferManager.json";
import AvalancheAssetLink from "./abis/AvalancheAssetLink.json";

export const ABIS = {
  RWA: RWA.abi,
  SECURITY_LAYER: SecurityLayer.abi,
  FEE_COLLECTOR: FeeCollector.abi,
  TRANSFER_MANAGER: TransferManager.abi,
  AVALANCHE_ASSET_LINK: AvalancheAssetLink.abi,
};
