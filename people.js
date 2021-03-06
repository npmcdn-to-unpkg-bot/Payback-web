angular.module('people', [])

.component('people', {
  template: '<h1>People</h1><ng-outlet></ng-outlet>',
  $routeConfig: [
		{path: '/', name: 'PeopleList', component: 'peopleList', useAsDefault: true},
	]
})
.component('peopleList', {
  templateUrl: 'people-list.html',
  controller: PeopleListComponent
})

.service('peopleService', PeopleService);

function PeopleListComponent(peopleService) {
	var $ctrl = this;
	peopleService.getPeople().then(function(people) {
		$ctrl.people = people;
	});
}

function PeopleService($q, appData) {
	// var peoplePromise = $q.when([
	// 	{ id: 1, name: 'John Rapp' },
	// 	{ id: 2, name: 'Simme Pinne' },
	// ]);

  var peoplePromise = appData.then(function(data) {
    return data.people.filter(function(person) {
			return data.deleted.indexOf(person.id) === -1;
		});
	});

	this.getPeople = function() {
		return peoplePromise;
	};

	this.getPersonById = function(id) {
		return this.getPeople().then(function(person) {
			return people.filter(function(person) {
				return person.id === id;
			});
		});
	};
}
