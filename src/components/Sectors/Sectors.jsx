import React, { useState } from "react";
import styles from "./Sectors.module.css";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

function Sectors({ sectors, onPrizeChange, onDeleteSector, onUpdateSector }) {
  const [tempProbabilities, setTempProbabilities] = useState({});

  const handleProbabilityChange = (id, value) => {
    setTempProbabilities((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveProbability = (id) => {
    const newProbability = tempProbabilities[id];
    if (newProbability !== undefined) {
      onUpdateSector(id, "probability", newProbability);
      setTempProbabilities((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  return (
    <div className={styles.sectors_list}>
      {sectors.map((sector, index) => (
        <div key={sector.id} className={styles.sector_item}>
          <label className={styles.sector_label}>Сектор {index + 1}:</label>
          <div className={styles.inputs_row}>
            <Input
              value={sector.prize?.name || ""}
              onChange={(e) => onPrizeChange(sector.id, e.target.value)}
              className={styles.input_half}
            />
            <Input
              placeholder="Вероятность"
              value={tempProbabilities[sector.id] ?? sector.probability}
              onChange={(e) =>
                handleProbabilityChange(sector.id, e.target.value)
              }
              className={styles.input_half}
              type="number"
              min={0}
              max={100}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteSector(sector.id)}
            />
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleSaveProbability(sector.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sectors;
