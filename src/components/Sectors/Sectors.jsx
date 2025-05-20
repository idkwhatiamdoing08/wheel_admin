import React from "react";
import styles from "./Sectors.module.css";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

function Sectors({
  sectors,
  onPrizeChange,
  onProbabilityChange,
  onDeleteSector,
  onUpdateSector,
}) {
  console.log("sectors", sectors);
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
              value={sector.probability}
              onChange={(e) => onProbabilityChange(sector.id, e.target.value)}
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
              text
              icon={<CheckOutlined />}
              onClick={() => onUpdateSector(sector.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sectors;
