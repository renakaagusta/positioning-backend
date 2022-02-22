async function connector(){
    await graph.addVertex('0', {
        '12': await weight(data.features[0].geometry["coordinates"], data.features[1].geometry["coordinates"], "0", "1"),
        '6': await weight(data.features[0].geometry["coordinates"], data.features[6].geometry["coordinates"], "0", "6"),
    });
    await graph.addVertex('1', {
        '2': await weight(data.features[1].geometry["coordinates"], data.features[2].geometry["coordinates"], "1", "2"),
        '5': await weight(data.features[1].geometry["coordinates"], data.features[5].geometry["coordinates"], "1", "5"),
    });
    await graph.addVertex('2', {
        '3': await weight(data.features[2].geometry["coordinates"], data.features[3].geometry["coordinates"], "2", "3")
    });
    await graph.addVertex('3', {
        '4': await weight(data.features[3].geometry["coordinates"], data.features[4].geometry["coordinates"], "3", "4"),
        '9': await weight(data.features[3].geometry["coordinates"], data.features[9].geometry["coordinates"], "3", "9")
    });
    await graph.addVertex('4', {        
        '5': await weight(data.features[4].geometry["coordinates"], data.features[5].geometry["coordinates"], "4", "5"),
        '8': await weight(data.features[4].geometry["coordinates"], data.features[8].geometry["coordinates"], "4", "8")
    });
    await graph.addVertex('5', {        
        '6': await weight(data.features[5].geometry["coordinates"], data.features[6].geometry["coordinates"], "5", "6")
    });
    await graph.addVertex('6', {
        '7': await weight(data.features[6].geometry["coordinates"], data.features[7].geometry["coordinates"], "6", "7"),
    });
    await graph.addVertex('7', {
        '8': await weight(data.features[7].geometry["coordinates"], data.features[8].geometry["coordinates"], "7", "8"),
        '13': await weight(data.features[7].geometry["coordinates"], data.features[13].geometry["coordinates"], "7", "13")
    });
    await graph.addVertex('8', {
        '9': await weight(data.features[8].geometry["coordinates"], data.features[9].geometry["coordinates"], "8", "9"),
        '11': await weight(data.features[8].geometry["coordinates"], data.features[11].geometry["coordinates"], "8", "11")
    });
    await graph.addVertex('9', {
        '10': await weight(data.features[9].geometry["coordinates"], data.features[10].geometry["coordinates"], "9", "10")
    });
    await graph.addVertex('10', {
        '11': await weight(data.features[10].geometry["coordinates"], data.features[11].geometry["coordinates"], "10", "11")
    });
    await graph.addVertex('11', {
        '12': await weight(data.features[11].geometry["coordinates"], data.features[12].geometry["coordinates"], "11", "12")
    });
    await graph.addVertex('12', {
        '13': await weight(data.features[12].geometry["coordinates"], data.features[13].geometry["coordinates"], "12", "13"),
        '14': await weight(data.features[12].geometry["coordinates"], data.features[14].geometry["coordinates"], "12", "13")

    });
    await graph.addVertex('13');
    await graph.addVertex('14');

   return 0;
}