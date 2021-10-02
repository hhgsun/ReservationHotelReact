import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { jumpStep, selectCompletedSteps, selectStep } from '../store/registrySlice';
import "../styles/StepsNav.scss";

export default function Navigation() {
  const step = useSelector(selectStep)
  const completedSteps = useSelector(selectCompletedSteps)
  const dispatch = useDispatch();

  const goStepNumber = (num) => {
    if (num === 0) {
      dispatch(jumpStep(num));
    }
    if (num === 1 && completedSteps[0]) {
      dispatch(jumpStep(num));
      return;
    }
    if (num === 2 && completedSteps[0] && completedSteps[1]) {
      dispatch(jumpStep(num));
      return;
    }
  }

  return (
    <div className="steps-navigation">
      {JSON.stringify(completedSteps[step])}
      <ul>
        <li className={step === 0 ? 'active' : ''} onClick={() => goStepNumber(0)}>
          <div className="circ-icon">
            <img alt="tarih" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAChklEQVR4nO3dvXLTQBiF4ZefkoIOhtSpfUXcXygypGGGgguAkquIQ4YZ4jF1KBwXlhVJtnatI/M+M1vE1kqfdGaj1ebHUMclcA2sgMdGWwGfgItKxy5h7vXvuAR+s38izXZP5knNvf491/SfzLZdTVRjl7nXv6dtmD/X/kxUY5dJ639ReodsCu06Rt/7U5u0/pcld6bxDCSMgYR5LpAFcAMsGX6D27ZDHbr/2q12/bdsru1i6AEWwLriCU59wVPqXzMwlJuZnNDcA3kEPjd33jZlWwLvWl4/Vt+0MV3N+n/RuNZtgTQPeOg8u6//2P3XVrv+zv7OssIYSBgDCVMjkFXj665Zy0OF4481af01AvlaadtTiau/bx7e54LND2/65uD3wIcC9ZZWu/6Dr+/YQGBT6BWbId3c38PTe4lhbNWsv/P61ngOUTefQ+bEQMIYSBgDCWMgYV4P2GZuy+Wz5ggJYyBhDCTMkHuIT+pldd6THSFhDCSMgYQxkDAGEsZAwhhImCHPIYf639a+/Auqc2YgYQwkTI17SNPQ77HH/rbL1P2KcoSEMZAwBhLGQMIYSBgDCWMgYQwkjIGEOcWT+rFPtnPpV5QjJIyBhDGQMK72ju9XlCMkjIGEMZAwBhLGQMIYSBgDCWMgYQwkjKu94/sV5QgJYyBhDCSMq73j+xXlCAljIGEMJIyBhDGQMAYSxkDCGEgYAwnjau/4fkU5QsIYSBgDCVPjHuJ/MR3BERLGQMIYSBgDCWMgYQwkjIGEaXsOuWP3Q9cj1njO1G3zhbYR8v0EhWjjx5CNFsCa/s+CtY1rf5+u9Y5XLYHcAV+A98Bb4E3LNjreEvgGfAR+TlyLJOmM/ANpqAXcSfB8pwAAAABJRU5ErkJggg==" />
          </div>
          <p>
            Otel ve Tarih Seçimi
          </p>
        </li>

        <li className={step === 1 ? 'active' : ''} onClick={() => goStepNumber(1)}>
          <div className="circ-icon">
            <img alt="oda tipi" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAD0UlEQVR4nO2cz0sUYRjHP7tEIShpBqF0yIU62LVzlwi6FKTZD+1fsbplHiIoKLpFRR1zvdQpOmvdqr9AS13LgwoJrR3eVZZpZ+aZd95954fPBx6EnXlnvvNxeOd9Z2YXFEVRFEVRfFDJOkBO6AMuAVeAUWAIGATWgR/AV6AOvAc2M8pYaAaAWWAb2BXUNvAA6M8ibFGZwJyxEsHBWgfG/UcuFhXgLtDETvJeNYE7aPcbyj3SCQ7WtN/4xeAa8WfyGjAJjABTQCNm/SYw5vMg8s4Asj75VqDdlKBNA71A7jOLrCs4FWg3Imw30/UjKAB9yIdwk4G2t4XttoHeLh9H7plAfnFrYLqLGkZyXB/dXgd+yPcStyONsHoRFqDq/phyyVlP+xkNW3DIU4CsGUq4fvskZDdBu2HJBsvMH+BwgvVtRe8ARzotOChdx7qn/ayFLTgoopez3s9BEf3N036+hy2QiC7DP6Oe5/30AE+AjVY9bn1WRHqRzwyDFz9pmy0sZ4aPOmzsoc2GcsIM3RV93zbYzw4bW7HdWA7oRz6dbkey/hpw1DaYJETRGCf9k5VgNYGraUKVUTSYx1guRad+wlJW0RXMsz4XzwyncTC7LqvoPcZIdgu0vRqk7C7aKbtoMBfIGeRDvy3M6CLxhS/qtA+TWsYbUb2YN5UuY251DgPHMWfuMmZmWQc+YPmmkor2RBmm14VARXtCRXtCRXtCRXuiW6KrmBdR5jHDo53W3zrmlSvpfl1OlW1rE3ND/zlwMbGJFAcZRw34EtF+F/jcWs82Q5b1CTgjyC7GRnQNWBUGXsG812aTIev6BZyPyS4mqegq8WdysBaJ7kayFhon+3REdjFJRU9aBr5pkSEv9TEiu5ikouctw85ZZMhTXYjIv4/LUcc5z+3ywnXJSi5FH7NsN+gwQxaILoouRdu+dtVwmCELTkpWcil60bLdgsMMWSB6l8Ol6DeW7d46zFBIko46qpgZX5Ir9gLFHUdLnIiw2WgNM+OThFvh/29ASTPkrVJhu9ERTH8ddybHTb+jMuStUpFmo1XMjG8OWMK8cb8EvANuUKy7d05E68NZT+iNf0+oaE+oaE+oaE+o6PSIHNqIznoolbf6S8rv+GR9AEWs0O/42IyjlXBWgROdFqho93R0qhdDT6hoT6hoT6hoT6hoT6hoT6hoT6hoT6hoT6hoT6hoT9j8wKA+nDUkuhekZ7QnVLQnokRvdPjsd7eCFJBEfqJEv+7w2avEccqLMz89wDPMj4FsAU8p7u/edQPnfiroSCMK9aMoiqIoiqIoXeIfLlR046rAvCYAAAAASUVORK5CYII=" />          </div>
          <p>
            Oda Tipi ve Manzara Seçimi
          </p>
        </li>

        <li className={step === 2 ? 'active' : ''} onClick={() => goStepNumber(2)}>
          <div className="circ-icon">
            <img alt="ödeme" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACPElEQVR4nO3dTW7TQBjG8T+IrhpxArgAIrBAfJyiZdEVBwrLAleAA9BztOyr7PgQ7GklKiG1LNwuMjHtxLHVR/H/J80ikseavo/GjlPpNUiSJEmSJEmSJEkarzuVx20Bu8Br4BnwENgealEb4hT4AXwBPgMHwN8+TrwLzIELx1pjflnLzu4CbwP+kE0a58DssrYrM4zhxmyFHIBma50XJ/kD7AMv8P5RY5umVu9oalfulJ3aE22xfM/4Cjzud72jMgW+sVjTOU2tb7TH8s4wjPVNgTMWa7tXM/FTMWl/oAWO0XsWa/uxZtJxMen5UKsboZcs1va4ZtJJMWky1OpGaMJibU/KA9qe1C8qjlF319a30wOKhmMgYQwkzL2KY8prngbkDgljIGEMJIyBhDGQMAYSxkDCGEgYAwlT86Tur739uvaXD3dIGAMJYyBhDCSMgYSp+ZZV67b/b7IR3wbdIWEMJIyBhOnzHrIR1/Db5g4JYyBhDCSMgYQxkDAGEsZAwhhIGAMJYyBhDCSMgYQxkDAGEsZAwhhIGAMJYyBhDCRMWyBlQxSbz/TnfvH5d3lAWyA/i8+PeluOylr+Kg9oC+So+Pymt+WorOVhzaS2Fn/Tftc1Sk/p2OLvf00wDaW7J6zRBBPa28Se0fQMfIU3+hoTmlp9YHlnrNQm9oqNlIcbKzdShuaGP2N5pzi6j7VajV/ZwWb8fYw5FZeprq+reID3kZucAt9pXldxQI+vq5AkSZIkSZIkSZK0qf4BppdpF5Dv9rwAAAAASUVORK5CYII=" />          </div>
          <p>
            Önizleme ve Ödeme İşlemleri
          </p>
        </li>

      </ul>
    </div>
  )
}
