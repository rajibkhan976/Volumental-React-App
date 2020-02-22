import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const HomeComponent = () => {
	
	const [sampleShoes, setSampleShoes] = useState([]);
	const [error, setError] = useState(undefined);
	
	useEffect(() => {
		const username = 'store';
		const password = 'november17';
		fetch(`https://homeexercise.volumental.com/sizingsample?page=`,
		{
			method: 'GET',
			mode: 'cors',
			headers: {
				'Authorization': "Basic " + btoa(username + ":" + password),
				'Accept': 'application/json'
			  }
		})
		.then(res => res.json().then((value) => {
			setSampleShoes(value.data);
		})
		)
		.catch((error) => {
			setError(error);
		});
	});
	
	const organizeChartDataSet = (realData) =>  {
		
		let data = {};
		
		if (realData.length !== 0) {
			realData.map((value, index) => {
				data = Object.assign(data, {
					labels: Object.keys(value.sizes),
					datasets: organizeChartData(value.sizes)
					
				});
			})
		}
		return data;
	}
	
	const options = {
						title: {
						display: true,
						text: 'Chart.js Bar Chart - Stacked'
						},
						tooltips: {
						mode: 'index',
						intersect: false
						},
						responsive: true,
						scales: {
							xAxes: [{
								stacked: true
							}],
							yAxes: [{
								stacked: false
							}]
						},
						maintainAspectRatio: false 
					};
	
	const organizeChartData = (sizesObject) => {
		let barDataObject = [];
		
		let widthArray = ['A','B','C','D','E'];
		let lengthForA = [];
		let lengthForB = [];
		let lengthForC = [];
		let lengthForD = [];
		let lengthForE = [];
		
		for (var showInfo in sizesObject) {
			if (Object.keys(sizesObject[showInfo]).includes('A')) {
				for (var showData in sizesObject[showInfo]) {
					if (showData === 'A') {
						lengthForA.push(sizesObject[showInfo][showData]);
					} 
				}
			} else {
				lengthForA.push(0);
			}
			if (Object.keys(sizesObject[showInfo]).includes('B')) {
				for (var showData in sizesObject[showInfo]) {
					if (showData === 'B') {
						lengthForB.push(sizesObject[showInfo][showData]);
					} 
				}
			} else {
				lengthForB.push(0);
			}
			if (Object.keys(sizesObject[showInfo]).includes('C')) {
				for (var showData in sizesObject[showInfo]) {
					if (showData === 'C') {
						lengthForC.push(sizesObject[showInfo][showData]);
					} 
				}
			} else {
				lengthForC.push(0);
			}
			if (Object.keys(sizesObject[showInfo]).includes('D')) {
				for (var showData in sizesObject[showInfo]) {
					if (showData === 'D') {
						lengthForD.push(sizesObject[showInfo][showData]);
					} 
				}
			} else {
				lengthForD.push(0);
			}
			if (Object.keys(sizesObject[showInfo]).includes('E')) {
				for (var showData in sizesObject[showInfo]) {
					if (showData === 'E') {
						lengthForE.push(sizesObject[showInfo][showData]);
					} 
				}
			} else {
				lengthForE.push(0);
			}
		}
		
		for (var c = 0; c < widthArray.length; c++) {
			if (widthArray[c] === 'A') {
				barDataObject.push({
					barThickness: 130,
					maxBarThickness: 15,
					minBarLength: 5,
					backgroundColor: "red",
					label: 'A',
					data: lengthForA
				});
			} else if (widthArray[c] === 'B') {
				barDataObject.push({
					barThickness: 130,
					maxBarThickness: 15,
					minBarLength: 5,
					backgroundColor: "blue",
					label: 'B',
					data: lengthForB
				});
			}
			else if (widthArray[c] === 'C') {
				barDataObject.push({
					barThickness: 130,
					maxBarThickness: 15,
					minBarLength: 5,
					backgroundColor: "orange",
					label: 'C',
					data: lengthForC
				});
			}
			else if (widthArray[c] === 'D') {
				barDataObject.push({
					barThickness: 130,
					maxBarThickness: 15,
					minBarLength: 5,
					backgroundColor: "yellow",
					label: 'D',
					data: lengthForD
				});
			} else {
				barDataObject.push({
					barThickness: 130,
					maxBarThickness: 15,
					minBarLength: 5,
					backgroundColor: "pink",
					label: 'E',
					data: lengthForE
				});
			}
			
		}
		console.log(widthArray);
		return barDataObject;
	}
	
	console.log(sampleShoes);
	return (
	<div className="container">
	  <div className="row">
		<div className="col-lg-12">
			<Bar
			  data={organizeChartDataSet(sampleShoes)}
			  width={100}
			  height={500}
			  options={options}
			/>
		</div>
	  </div>
	</div>
	);
}

export default HomeComponent;