import { InfoLogic } from "../../pageComponents/InfoLogic/InfoLogics";

export const DeliveryAndPay = () => {
  return (
    <InfoLogic
    tex1={(
      <>
        Processing Time: <br />
        Once your order is confirmed, our skilled team at CherWoodpack begins the process of handcrafting your furniture with meticulous attention to detail. The processing time may vary based on the complexity of your order and our current production schedule. Rest assured, we are committed to delivering quality craftsmanship within a reasonable timeframe.
      </>
    )}
    tex1_eng={(
      <>
        Час виготовлення: <br />
        Як тільки ваше замовлення підтверджено, наш висококваліфікований колектив на CherWoodpack розпочинає процес ручного виготовлення вашого замовлення з особливою увагою до деталей. Термін обробки може варіюватися залежно від складності вашого замовлення та нашого поточного графіку виробництва. Будьте впевнені, ми віддані доставці якісної ручної роботи протягом розумного періоду часу.
      </>
    )}

    tex2={(
      <>
        Shipping Preparation: <br />
        Upon completion of your custom furniture, we carefully prepare it for shipping. This involves thorough quality checks and secure packaging to ensure that your order arrives in pristine condition.
      </>
    )}
    tex2_eng={(
      <>
        Підготовка до відправлення: <br />
        Після завершення виготовлення вашого індивідуального меблю, ми тщательно готуємо його до відправлення. Це включає ретельні перевірки якості та надійну упаковку, щоб забезпечити, що ваше замовлення прибуде в ідеальному стані.
      </>
    )}
    grid={false}
  />
  );
}