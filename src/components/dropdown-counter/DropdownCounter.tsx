import React from 'react';
import styles from './dropdown-counter.module.scss';

export interface IDropdownCounterProps {
  text: string,
  number: number,
  onChange:Function,
};

interface IDropdownCounterState {
  text: string,
  counter: number,
  onChange: Function,
};

class DropdownCounter extends React.Component <IDropdownCounterProps, IDropdownCounterState> {

  constructor(props: IDropdownCounterProps) {
    super(props);
    this.state = {
      text: props.text,
      counter: props.number,
      onChange:props.onChange,
    };
    this.handleClickMinus = this.handleClickMinus.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
  }

  private handleClickMinus() {
    if (this.state.counter > 0) {
      this.setState({ counter: this.state.counter - 1 });
      this.state.onChange(this.state.counter - 1);
    }
  }

  private handleClickPlus() {
    this.setState({ counter: this.state.counter + 1});
    this.state.onChange(this.state.counter + 1);
  }

  render() {
    let isMinusDark = false;
    if (this.state.counter > 0) {
      isMinusDark = true;
    }
    return (
      <div className={styles['dropdown-counter']}>
        <div className={styles['dropdown-counter__header']}>{this.props.text}</div>
        <div className={styles['dropdown-counter__container']}>
          <div className={isMinusDark ? styles['container-dropdown__decrease_dark'] :
            styles['container-dropdown__decrease']} onClick={this.handleClickMinus}>-</div>
          <div className={styles['container-dropdown__value']}>{this.state.counter}</div>
          <div className={styles['container-dropdown__increase']} onClick={this.handleClickPlus}>+</div>
        </div>
      </div>
      )
  }
}

export default DropdownCounter;