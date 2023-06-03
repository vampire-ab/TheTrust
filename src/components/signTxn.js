async function signTransaction() {
    const { sig } = await provider.request({
      method: "eth_signTransaction",
      params: [
        {
          from: "0x9dE5B1C0e3809e15d9D0a77b4C908acf3393dc17", // sender account address
          gasPrice: 0,
          to: "0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780", // receiver account address
          value: "0x0de0b6b3a7640000",
        },
      ],
    });
    console.log({ sig });
  }