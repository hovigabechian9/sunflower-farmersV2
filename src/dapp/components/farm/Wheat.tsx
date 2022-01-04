import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { UpgradeOverlay } from "../ui/UpgradeModal";

import Modal from "react-bootstrap/Modal";
import { Button } from "../ui/Button";
import { Message } from "../ui/Message";
import { Panel } from "../ui/Panel";

import soil from "../../images/land/soil/planted.png";
import planted from "../../images/land/soil/planted.png";
import terrain from "../../images/land/soil/soil.png";
import wheatFields from "../../images/land/wheat_fields.png";
import mining from "../../images/characters/mining.gif";
import waiting from "../../images/characters/waiting.gif";
import smallRock from "../../images/decorations/rock2.png";
import rock from "../../images/land/gold.png";
import arrowDown from "../../images/ui/arrow_down.png";
import arrowUp from "../../images/ui/arrow_up.png";
import closeIcon from "../../images/ui/close.png";
import questionMark from "../../images/ui/expression_confused.png";
import stone from "../../images/ui/gold_ore.png";
import pickaxe from "../../images/ui/iron_pickaxe.png";
import timer from "../../images/ui/timer.png";

import { ActionableItem, Fruit, Square } from "../../types/contract";

import { Field } from "./Field";
import { FruitItem } from "../../types/fruits";

import "./Wheat.css";
import { Inventory } from "../../types/crafting";

interface Props {
  inventory: Inventory;
}

export const Wheat: React.FC<Props> = ({ inventory }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [treeStrength, setTreeStrength] = React.useState(2);
  const [amount, setAmount] = React.useState(0);

  const limit = 3;

  const plant = () => {
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

  return (
    <div id="wheat-fields" onClick={open}>
      <img src={wheatFields} id="wheat-field-image" />

      <img src={terrain} id="wheat-1" />
      <img src={terrain} id="wheat-2" />
      <img src={terrain} id="wheat-3" />

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
                    <img src={pickaxe} />
                  </div>
                  <div className="resource-material">
                    <span>Mines</span>
                    <div>
                      <span>1-2</span>
                      <img src={stone} />
                    </div>
                  </div>
                  <div className="resource-material">
                    <span>Regrows every 12 hours</span>
                    <div>
                      <img id="resource-timer" src={timer} />
                    </div>
                  </div>
                </div>
                {inventory["Iron Pickaxe"] < amount ? (
                  <Message>
                    You need a{" "}
                    <img src={pickaxe} className="required-tool" />
                  </Message>
                ) : (
                  <div className="gather-resources">
                    <div id="craft-count">
                      <img className="gather-axe" src={pickaxe} />
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
                      <span id="craft-button-text">Mine</span>
                    </Button>
                  </div>
                )}
              </div>
              <div className="resource-details">
                <span className="resource-title">Gold mine</span>
                <img src={rock} className="resource-image" />
                <span className="resource-description">
                  A scarce resource that can be mined for gold.
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
    </div>
  );
};
