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

import "./Wheat.css";
import { Inventory } from "../../types/crafting";

interface Props {
  inventory: Inventory;
}

export const Wheat: React.FC<Props> = ({ inventory }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [treeStrength, setTreeStrength] = React.useState(2);
  const [amount, setAmount] = React.useState(0);
  const [plants, setPlants] = React.useState<{
    plantedAt: number;
    amount: number;
  }>({
    amount: 3,
    plantedAt: Date.now() - 500000,
  });

  const limit = 3;

  const plant = () => {
    console.log("Plant!");
  };

  const harvest = () => {
    console.log("Plant!");
  };

  const open = () => {
    setShowModal(true);
    setAmount(1);
  };

  const close = () => {
    setShowModal(false);
    setAmount(0);
  };

  // TODO scarecrow time
  const isReady = plants.plantedAt > Date.now() / 1000 - 60 * 60 * 12;

  return (
    <>
      <div id="wheat-fields" onClick={open}>
        <img src={wheatFields} id="wheat-field-image" />

        {amount > 0 && <img src={seedling} id="wheat-plant-1" />}

        {amount > 1 && <img src={seedling} id="wheat-plant-2" />}

        {amount > 2 && <img src={seedling} id="wheat-plant-3" />}

        {plants.amount > 0 && !isReady && (
          <img src={seedling} id="wheat-plant-1" />
        )}
        {plants.amount >= 1 && !isReady && (
          <img src={seedling} id="wheat-plant-2" />
        )}
        {plants.amount >= 2 && !isReady && (
          <img src={seedling} id="wheat-plant-3" />
        )}

        {amount == 0 && plants.amount > 0 && isReady && (
          <img src={wheatPlant} id="wheat-ready-1" />
        )}
        {amount <= 1 && plants.amount >= 1 && isReady && (
          <img src={wheatPlant} id="wheat-ready-2" />
        )}
        {amount <= 2 && plants.amount >= 2 && isReady && (
          <img src={wheatPlant} id="wheat-ready-3" />
        )}
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
                {inventory["Iron Pickaxe"] < amount ? (
                  <Message>
                    You need <img src={seed} className="required-tool" />
                  </Message>
                ) : (
                  <>
                    {isReady && (
                      <Button onClick={plant}>
                        <span id="craft-button-text">Harvest</span>
                      </Button>
                    )}
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

                      <Button
                        onClick={plant}
                        disabled={inventory["Iron Pickaxe"] < amount}
                      >
                        <span id="craft-button-text">Plant</span>
                      </Button>
                    </div>
                  </>
                )}
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
