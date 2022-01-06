import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { UpgradeOverlay } from "../ui/UpgradeModal";

import Modal from "react-bootstrap/Modal";
import { Button } from "../ui/Button";
import { Message } from "../ui/Message";
import { Panel } from "../ui/Panel";

import wheatFields from "../../images/land/wheat_fieldz.png";
import arrowDown from "../../images/ui/arrow_down.png";
import arrowUp from "../../images/ui/arrow_up.png";
import closeIcon from "../../images/ui/close.png";
import timer from "../../images/ui/timer.png";
import seed from "../../images/wheat/seed.png";
import wheatPlant from "../../images/wheat/plant.png";
import seedling from "../../images/wheat/seedling.png";
import wheat from "../../images/wheat/wheat.png";

import {
  BlockchainEvent,
  BlockchainState,
  Context,
  service,
} from "../../machine";

import "./Wheat.css";
import { Inventory } from "../../types/crafting";
import { useService } from "@xstate/react";

interface Props {
  inventory: Inventory;
}

export const Wheat: React.FC<Props> = ({ inventory }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [harvested, setHarvested] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [plants, setPlants] = React.useState<{
    plantedAt: number;
    amount: number;
  }>({
    amount: 3,
    plantedAt: Date.now() - 500000,
  });

  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);

  const seedAmount = inventory["Wheat Seed"];
  const limit = 3;

  const plant = () => {
    console.log("Plant!");
    send("HARVEST_WHEAT", {
      harvestCount: plants.amount,
      plantCount: amount,
    });
  };

  const harvest = () => {
    send("HARVEST_WHEAT", {
      harvestCount: plants.amount,
      plantCount: 0,
    });

    setShowModal(false);
  };

  const harvestAndPlant = () => {
    setHarvested(true);
    setAmount(1);
  };

  const open = () => {
    setShowModal(true);

    setHarvested(false);
    setAmount(0);
  };

  const close = () => {
    setShowModal(false);
    setAmount(0);
  };

  // TODO scarecrow time
  const isReady = plants.plantedAt > Date.now() / 1000 - 60 * 60 * 12;

  const Actions = () => {
    if (isReady && !harvested) {
      return (
        <>
          <Button onClick={harvest}>
            <span id="craft-button-text">Harvest</span>
          </Button>
          <Button onClick={harvestAndPlant}>
            <span id="craft-button-text">Harvest & Plant</span>
          </Button>
        </>
      );
    }

    if (seedAmount < amount) {
      return (
        <Message>
          You need <img src={seed} className="required-tool" />
        </Message>
      );
    }

    return (
      <div className="gather-resources">
        <div id="craft-count">
          <img className="gather-axe" src={seed} />
          <Message>{amount}</Message>
          <div id="arrow-container">
            {amount < limit ? (
              <img
                className="craft-arrow"
                alt="Step up donation value"
                src={arrowUp}
                onClick={() => setAmount((r) => r + 1)}
              />
            ) : (
              <div />
            )}

            {amount > 1 && (
              <img
                className="craft-arrow"
                alt="Step down donation value"
                src={arrowDown}
                onClick={() => setAmount((r) => r - 1)}
              />
            )}
          </div>
        </div>

        <Button onClick={plant} disabled={seedAmount < amount}>
          <span id="craft-button-text">Plant</span>
        </Button>
      </div>
    );
  };

  const Crops = () => {
    if (amount > 0) {
      return Array(amount)
        .fill(null)
        .map((_, i) => <img src={seedling} id={`wheat-plant-${i + 1}`} />);
    }

    if (!isReady) {
      return Array(plants.amount)
        .fill(null)
        .map((_, i) => <img src={seedling} id={`wheat-plant-${i + 1}`} />);
    }

    if (plants.amount > 0) {
      return Array(plants.amount)
        .fill(null)
        .map((_, i) => (
          <img src={wheatPlant} id={`wheat-ready-${i + 1}`} />
        ));
    }
  };

  return (
    <>
      <div id="wheat-fields" onClick={open}>
        <img src={wheatFields} id="wheat-field-image" />

        {Crops()}
      </div>
      {showModal && (
        <Modal
          show={showModal}
          centered
          onHide={close}
          backdrop={false}
          dialogClassName="gather-modal"
        >
          <Panel>
            <div className="gather-panel">
              <img
                src={closeIcon}
                className="gather-close-icon"
                onClick={close}
              />

              <div className="resource-materials">
                <div>
                  <div className="resource-material">
                    <span>Requires</span>
                    <img src={seed} />
                  </div>
                  <div className="resource-material">
                    <span>Plants</span>
                    <div>
                      <span>1</span>
                      <img src={wheat} />
                    </div>
                  </div>
                  <div className="resource-material">
                    <span>Takes 12 hours to grow</span>
                    <div>
                      <img id="resource-timer" src={timer} />
                    </div>
                  </div>
                </div>
                {Actions()}
              </div>
              <div className="resource-details">
                <span className="resource-title">Wheat Field</span>
                <img src={wheatPlant} className="resource-image" />
                <span className="resource-description">
                  A resource used in cooking recipes.
                </span>
                <a
                  href="https://docs.sunflower-farmers.com/resources"
                  target="_blank"
                >
                  <h3 className="current-price-supply-demand">
                    Read more
                  </h3>
                </a>
              </div>
            </div>
          </Panel>
        </Modal>
      )}
    </>
  );
};
