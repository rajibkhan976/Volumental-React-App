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
		}))
		.catch((error) => {
			setError(error);
		});
	}, []);
	
	const options = {
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
								stacked: true
							}]
						},
						maintainAspectRatio: false 
					};
	
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
	
	const organizeChartData = (sizesObject) => {
		
		let bgColorArray = [
		'red','orange','blue','yellow','pink','grey','black','#800000','#808000','#00FF00'
		];
		let barDataObject = [];
		let widthArray = [];
		let frequencyArray = [];
		let barFrequencyArray = [];
		
		for (var length in sizesObject) {
			for (var width in sizesObject[length]) {
				if (widthArray.includes(width)) {
					continue;
				} else {
					widthArray.push(width);
				}
			}
		}
		
		for (var width = 0; width < widthArray.length; width++) {
			
		for (var showInfo in sizesObject) {
				if (Object.keys(sizesObject[showInfo]).includes(widthArray[width])) {
				for (var showData in sizesObject[showInfo]) {
					if (showData === widthArray[width]) {
						frequencyArray.push(sizesObject[showInfo][showData]);
					} 
				}
				} else {
					frequencyArray.push(0);
				}
			}
			barFrequencyArray.push(frequencyArray);
			frequencyArray = [];
		}
		
		for (var c = 0; c < widthArray.length; c++) {
				barDataObject.push({
					barThickness: 130,
					maxBarThickness: 15,
					minBarLength: 1,
					stack: 'stack shoe sizes',
					backgroundColor: bgColorArray[c],
					label: widthArray[c],
					data: barFrequencyArray[c]
				});
		}
		
		return barDataObject;
	}
	
	return (
	<div className="container">
	{sampleShoes ?
		sampleShoes.map((value, index) => {
			return <div className="row" key={index}>
						<div className="col-sm-6">
							<div className="alert alert-info" role="alert">
								System : {value.system}
							</div>
						</div>
						<div className="col-sm-6">
							<div className="alert alert-info" role="alert">
								Gender : {value.gender}
							</div>
						</div>
			</div>
		})
		:
		null
		}
		{(!error && sampleShoes) ?
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
		:
		<div className="row">
			<div className="col-lg-12">
				<div className="alert alert-danger" role="alert">
					{`Ooops there is a server error!`}
				</div>
			</div>
		</div>
		}
	</div>
	);
}

export default HomeComponent;