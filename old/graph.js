async function connector(){
    await graph.addVertex('0', {
        '2': await weight(data.features[0].geometry["coordinates"], data.features[1].geometry["coordinates"], "0", "2"),
    });
    await graph.addVertex('1', {
        '7': await weight(data.features[1].geometry["coordinates"], data.features[7].geometry["coordinates"], "1", "7"),
    });
    await graph.addVertex('2', {
        '1': await weight(data.features[2].geometry["coordinates"], data.features[1].geometry["coordinates"], "2", "1"),
        '3': await weight(data.features[2].geometry["coordinates"], data.features[3].geometry["coordinates"], "2", "3"),
    });
    await graph.addVertex('3', {
        '4': await weight(data.features[3].geometry["coordinates"], data.features[4].geometry["coordinates"], "3", "4"),
        '6': await weight(data.features[3].geometry["coordinates"], data.features[6].geometry["coordinates"], "3", "4"),
    });
    await graph.addVertex('4', {
        '5': await weight(data.features[4].geometry["coordinates"], data.features[5].geometry["coordinates"], "3", "4"),
    });
    await graph.addVertex('5', {
        '6': await weight(data.features[5].geometry["coordinates"], data.features[6].geometry["coordinates"], "5", "6"),
        '11': await weight(data.features[5].geometry["coordinates"], data.features[11].geometry["coordinates"], "5", "11"),
    });
    await graph.addVertex('6', {
        '7': await weight(data.features[6].geometry["coordinates"], data.features[7].geometry["coordinates"], "6", "4"),
        '10': await weight(data.features[6].geometry["coordinates"], data.features[10].geometry["coordinates"], "6", "10"),
    });
    await graph.addVertex('7', {
        '8': await weight(data.features[7].geometry["coordinates"], data.features[8].geometry["coordinates"], "7", "8"),
    });
    await graph.addVertex('8', {
        '14': await weight(data.features[8].geometry["coordinates"], data.features[14].geometry["coordinates"], "8", "14"),
    });
    await graph.addVertex('9', {
        '8': await weight(data.features[9].geometry["coordinates"], data.features[8].geometry["coordinates"], "9", "8"),
    });
    await graph.addVertex('10', {
        '9': await weight(data.features[10].geometry["coordinates"], data.features[9].geometry["coordinates"], "10", "9"),
    });
    await graph.addVertex('11', {
        '10': await weight(data.features[11].geometry["coordinates"], data.features[10].geometry["coordinates"], "11", "10"),
        '12': await weight(data.features[11].geometry["coordinates"], data.features[12].geometry["coordinates"], "11", "12"),
    });
    await graph.addVertex('12', {
        '13': await weight(data.features[12].geometry["coordinates"], data.features[13].geometry["coordinates"], "11", "10"),
    });
    await graph.addVertex('13', {
        '14': await weight(data.features[13].geometry["coordinates"], data.features[14].geometry["coordinates"], "13", "14"),
    });
    await graph.addVertex('14');
   return 0;
}