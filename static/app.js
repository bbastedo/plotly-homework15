// Plotly Homework 15
// Ben Bastedo 

//1. Use the D3 library to read in `samples.json`
//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function chartCreation (sample){
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var dataArray = samples.filter(sampleObj => sampleObj.id == sample);
        var results = dataArray[0];
       // Use `otu_ids` as the labels for the bar chart.
        var otu_ids = results.otu_ids;
        // Use `otu_labels` as the hovertext for the chart
        var otu_labels = results.otu_labels;
        // Use `sample_values` as the values for the bar chart.
        var sample_values = results.sample_values;
        console.log(otu_ids);
        
        //Create dataset to plot
        data = [{
            type: "bar",
            orientation:'h',
            x: otu_ids.slice(0,10),
            y: sample_values.slice(0,10),
            text: otu_labels.slice(0,10)
        }];

        var barLayout ={
            title: 'Test Subject Data',
            showlegend: false,
            height:400,
            width:500
        };
        //create new bar chart plot
        Plotly.newPlot('bar', data, barLayout);

    // 3. Create a bubble chart that displays each sample.
    var trace = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        labels: otu_labels,
        marker: {
            color: otu_ids,
            size: sample_values,
            opacity: [1, 0.8, 0.6, 0.4],
            size: [40, 60, 80, 100]
        }
    };

    var bubble = [trace];
    console.log(otu_ids);
    // create Bubble Chart layout
    var bubbleLayout = {
        title:'Test Subject Data',
        showlegend: false,
        height: 600,
        width: 400 
    };
    // Create new Bubble Plot
    Plotly.newPlot('bubble', bubble, bubbleLayout);
    })
}
// 4. Display the sample metadata, i.e., an individual's demographic information.
function displayMetadata(sample){
    d3.json('samples.json').then((data)=> {
        var metadata = data.metadata;
        var dataArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var results = dataArray[0];
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");
        // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
        Object.entries(results).forEach(([key,value]) => {
            sample_metadata.append("h7").text(key+" : " +value)
        })
    })
}

