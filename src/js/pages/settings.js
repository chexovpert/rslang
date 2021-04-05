import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { useWordContext } from "../context/WordContext";

import "../../styles/pages/settings.scss";

export default function Settings() {
  const wordCntx = useWordContext();
  return (
    <div
      className="settings__container"
      style={{ display: `${wordCntx.settings ? "flex" : "none"}` }}
      onClick={() => wordCntx.setSettings(false)}
    >
      <div
        className="settings__content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div>
          <h5>{"Настройки отображения перевода"}</h5>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={wordCntx.showWordTransl}
                  onChange={(event) => {
                    wordCntx.setShowWordTransl(event.target.checked);
                  }}
                  color="primary"
                />
              }
              label="Отображать перевод слова"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={wordCntx.showExtraTransl}
                  onChange={(event) => {
                    wordCntx.setShowExtraTransl(event.target.checked);
                  }}
                  color="primary"
                />
              }
              label="Отображать перевод возле пояснения и примера"
            />
          </FormGroup>
        </div>
        <div>
          <h5>{"Настройки отображения кнопок управления словами"}</h5>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={wordCntx.showDifButton}
                  onChange={(event) => {
                    wordCntx.setShowDifButton(event.target.checked);
                  }}
                  color="primary"
                />
              }
              label={`Отображать кнопку "Сложное слово"`}
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={wordCntx.showDelButton}
                  onChange={(event) => {
                    wordCntx.setShowDelButton(event.target.checked);
                  }}
                  name="checkedA"
                  color="primary"
                />
              }
              label={`Отображать кнопку "Удалить слово"`}
            />
          </FormGroup>
        </div>
        <div>
          <h5>{"Настройки громкости звука"}</h5>
          <div className="settings__sound">
            <VolumeDown />
            <Slider
              value={wordCntx.soundVolume}
              onChange={(event, newvalue) => {
                wordCntx.setSoundVolume(newvalue);
              }}
              aria-labelledby="continuous-slider"
              style={{ width: "70%" }}
            />
            <VolumeUp />
          </div>
        </div>

        <div>а тута можна сделать чегонить еще</div>
      </div>
    </div>
  );
}
