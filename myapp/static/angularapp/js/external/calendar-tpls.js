// This is just a sample script. Paste your real code (javascript or HTML) here.
/**
 * angular-bootstrap-calendar - A pure AngularJS bootstrap themed responsive calendar that can display events and has views for year, month, week and day
 * @version v0.21.5
 * @link https://github.com/mattlewis92/angular-bootstrap-calendar
 * @license MIT
 */
! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t(
			require("angular"), require("moment"),
			function() {
				try {
					return require("interact.js")
				} catch (e) {}
			}()) : "function" == typeof define && define.amd ? define(["angular",
			"moment", "interact"
		], t) : "object" == typeof exports ? exports.angularBootstrapCalendarModuleName =
		t(require("angular"), require("moment"), function() {
			try {
				return require("interact.js")
			} catch (e) {}
		}()) : e.angularBootstrapCalendarModuleName = t(e.angular, e.moment, e.interact)
}(this, function(e, t, n) {
	return function(e) {
		function t(a) {
			if (n[a]) return n[a].exports;
			var r = n[a] = {
				exports: {},
				id: a,
				loaded: !1
			};
			return e[a].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
		}
		var n = {};
		return t.m = e, t.c = n, t.p = "", t(0)
	}([function(e, t, n) {
		"use strict";

		function a(e) {
			e.keys().forEach(e)
		}
		n(4);
		var r = n(1),
			i = {},
			l = n(42);
		l.keys().forEach(function(e) {
			var t = e.replace("./", ""),
				n = "mwl/" + t,
				a = t.replace(".html", "");
			i[a] = {
				cacheTemplateName: n,
				template: l(e)
			}
		}), e.exports = r.module("mwl.calendar", []).config(["calendarConfig",
			function(e) {
				r.forEach(i, function(t, n) {
					e.templates[n] || (e.templates[n] = t.cacheTemplateName)
				})
			}
		]).run(["$templateCache", "$interpolate", function(e, t) {
			r.forEach(i, function(n) {
				if (!e.get(n.cacheTemplateName)) {
					var a = n.template.replace("{{", t.startSymbol()).replace("}}", t
						.endSymbol());
					e.put(n.cacheTemplateName, a)
				}
			})
		}]).name, a(n(39)), a(n(40)), a(n(41))
	}, function(t, n) {
		t.exports = e
	}, function(e, n) {
		e.exports = t
	}, function(e, t, n) {
		"use strict";
		var a = n(2),
			r = 7,
			i = [0, 6],
			l = function(e, t, n) {
				var i = 1;
				if (e.end) {
					var l = a(e.start).isBefore(n) ? n : a(e.start);
					i = a(e.end).endOf("day").add(1, "minute").diff(l.startOf("day"),
						"days"), i > r && (i = r)
				}
				var d = t + i;
				return d > r && (i -= d - r), i
			};
		t.getDayOffset = function(e, t) {
			var n = 0;
			return a(e.start).startOf("day").isAfter(a(t)) && (n = a(e.start).startOf(
				"day").diff(t, "days")), n
		};
		var d = function(e) {
				var t = e.event,
					n = e.periodStart,
					r = e.periodEnd,
					i = a(t.start),
					l = a(t.end || t.start);
				return i.isAfter(n) && i.isBefore(r) ? !0 : l.isAfter(n) && l.isBefore(
					r) ? !0 : i.isBefore(n) && l.isAfter(r) ? !0 : i.isSame(n) || i.isSame(
					r) ? !0 : l.isSame(n) || l.isSame(r) ? !0 : !1
			},
			o = function(e) {
				var t = e.events,
					n = e.periodStart,
					a = e.periodEnd;
				return t.filter(function(e) {
					return d({
						event: e,
						periodStart: n,
						periodEnd: a
					})
				})
			},
			s = function(e) {
				var t = e.date,
					n = a().startOf("day");
				return {
					date: t,
					isPast: t.isBefore(n),
					isToday: t.isSame(n),
					isFuture: t.isAfter(n),
					isWeekend: i.indexOf(t.day()) > -1
				}
			};
		t.getWeekViewHeader = function(e) {
			for (var t = e.viewDate, n = a(t).startOf("week"), i = [], l = 0; r > l; l++) {
				var d = n.clone().add(l, "days");
				i.push(s({
					date: d
				}))
			}
			return i
		}, t.getWeekView = function(e) {
			var n = e.events,
				i = e.viewDate,
				d = a(i).startOf("week"),
				s = a(i).endOf("week"),
				c = o({
					events: n,
					periodStart: d,
					periodEnd: s
				}).map(function(e) {
					var n = t.getDayOffset(e, d),
						r = l(e, n, d);
					return {
						event: e,
						offset: n,
						span: r,
						extendsLeft: a(e.start).isBefore(d),
						extendsRight: a(e.end).isAfter(s)
					}
				}).sort(function(e, t) {
					var n = a(e.event.start).diff(a(t.event.start));
					if (0 === n) {
						var r = a(e.event.end || e.event.start),
							i = a(t.event.end || t.event.start);
						return a(i).diff(r)
					}
					return n
				}),
				v = [],
				m = [];
			return c.forEach(function(e, t) {
				if (-1 === m.indexOf(e)) {
					m.push(e);
					var n = e.span + e.offset,
						a = c.slice(t + 1).filter(function(e) {
							return -1 === m.indexOf(e) && e.offset >= n && n + e.span <= r ?
								(e.offset -= n, n += e.span + e.offset, m.push(e), !0) : void 0
						});
					v.push({
						row: [e].concat(a)
					})
				}
			}), v
		}, t.getMonthView = function(e) {
			for (var t = e.events, n = e.viewDate, r = a(n).startOf("month").startOf(
					"week"), i = a(n).endOf("month").endOf("week"), l = o({
					events: t,
					periodStart: a(n).startOf("month"),
					periodEnd: a(n).endOf("month")
				}), d = [], c = 0; c < i.diff(r, "days") + 1; c++) {
				var v = r.clone().add(c, "days"),
					m = s({
						date: v
					});
				m.inMonth = v.clone().startOf("month").isSame(a(n).startOf("month")),
					m.inMonth ? m.events = o({
						events: l,
						periodStart: a(v).startOf("day"),
						periodEnd: a(v).endOf("day")
					}) : m.events = [], d.push(m)
			}
			for (var u = Math.floor(d.length / 7), f = [], c = 0; u > c; c++) f.push(
				7 * c);
			return {
				rowOffsets: f,
				days: d
			}
		}
	}, function(e, t) {}, function(e, t) {
		e.exports =
			'<div class=cal-context ng-switch=vm.view ng-if=vm.templatesLoaded> <div class="alert alert-danger" ng-switch-default>The value passed to the view attribute of the calendar is not set</div> <div class="alert alert-danger" ng-hide=vm.viewDate>The value passed to view-date attribute of the calendar is not set</div> <mwl-calendar-year events=vm.events view-date=vm.viewDate on-event-click=vm.onEventClick on-event-times-changed=vm.onEventTimesChanged on-edit-event-click=vm.onEditEventClick on-delete-event-click=vm.onDeleteEventClick on-timespan-click=vm.onTimespanClick edit-event-html=vm.editEventHtml delete-event-html=vm.deleteEventHtml cell-is-open=vm.cellIsOpen cell-modifier=vm.cellModifier slide-box-disabled=vm.slideBoxDisabled custom-template-urls=vm.customTemplateUrls ng-switch-when=year> </mwl-calendar-year> <mwl-calendar-month events=vm.events view-date=vm.viewDate on-event-click=vm.onEventClick on-event-times-changed=vm.onEventTimesChanged on-edit-event-click=vm.onEditEventClick on-delete-event-click=vm.onDeleteEventClick on-timespan-click=vm.onTimespanClick edit-event-html=vm.editEventHtml delete-event-html=vm.deleteEventHtml cell-is-open=vm.cellIsOpen cell-modifier=vm.cellModifier slide-box-disabled=vm.slideBoxDisabled custom-template-urls=vm.customTemplateUrls ng-switch-when=month> </mwl-calendar-month> <mwl-calendar-week events=vm.events view-date=vm.viewDate on-event-click=vm.onEventClick on-event-times-changed=vm.onEventTimesChanged day-view-start=vm.dayViewStart day-view-end=vm.dayViewEnd day-view-split=vm.dayViewSplit day-view-event-chunk-size=vm.dayViewEventChunkSize on-timespan-click=vm.onTimespanClick on-date-range-select=vm.onDateRangeSelect custom-template-urls=vm.customTemplateUrls ng-switch-when=week> </mwl-calendar-week> <mwl-calendar-day events=vm.events view-date=vm.viewDate on-event-click=vm.onEventClick on-event-times-changed=vm.onEventTimesChanged on-timespan-click=vm.onTimespanClick on-date-range-select=vm.onDateRangeSelect day-view-start=vm.dayViewStart day-view-end=vm.dayViewEnd day-view-split=vm.dayViewSplit day-view-event-chunk-size=vm.dayViewEventChunkSize on-edit-event-click=vm.onEditEventClick on-delete-event-click=vm.onDeleteEventClick edit-event-html=vm.editEventHtml delete-event-html=vm.deleteEventHtml custom-template-urls=vm.customTemplateUrls ng-switch-when=day> </mwl-calendar-day> </div>'
	}, function(e, t) {
		e.exports =
			'<div class="cal-week-box cal-all-day-events-box" ng-if="vm.allDayEvents.length > 0"> <div class="cal-day-panel clearfix"> <div class=row> <div class=col-xs-12> <div class=cal-row-fluid> <div class="cal-cell-6 day-highlight dh-event-{{ event.type }}" data-event-class ng-repeat="event in vm.allDayEvents track by event.$id"> <strong> <span ng-bind="event.startsAt | calendarDate:\'datetime\':true"></span> <span ng-if=event.endsAt> - <span ng-bind="event.endsAt | calendarDate:\'datetime\':true"></span> </span> </strong> <a href=javascript:; class=event-item ng-bind-html="vm.calendarEventTitle.dayView(event) | calendarTrustAsHtml"> </a> </div> </div> </div> </div> </div> </div> <div class=cal-day-box> <div class="cal-day-panel clearfix" ng-style="{height: vm.dayViewHeight + \'px\'}"> <mwl-calendar-hour-list day-view-start=vm.dayViewStart day-view-end=vm.dayViewEnd day-view-split=vm.dayViewSplit on-timespan-click=vm.onTimespanClick on-date-range-select=vm.onDateRangeSelect on-event-times-changed=vm.onEventTimesChanged view-date=vm.viewDate custom-template-urls=vm.customTemplateUrls> </mwl-calendar-hour-list> <div class="pull-left day-event day-highlight" ng-repeat="event in vm.nonAllDayEvents track by event.$id" ng-class="\'dh-event-\' + event.type + \' \' + event.cssClass" ng-style="{top: event.top + \'px\', left: event.left + 60 + \'px\', height: event.height + \'px\'}" mwl-draggable="event.draggable === true" axis="\'xy\'" snap-grid="{y: vm.dayViewEventChunkSize || 30, x: 50}" on-drag="vm.eventDragged(event, y / 30)" on-drag-end="vm.eventDragComplete(event, y / 30)" mwl-resizable="event.resizable === true && event.endsAt" resize-edges="{top: true, bottom: true}" on-resize="vm.eventResized(event, edge, y / 30)" on-resize-end="vm.eventResizeComplete(event, edge, y / 30)"> <span class=cal-hours> <span ng-show="event.top == 0"><span ng-bind="(event.tempStartsAt || event.startsAt) | calendarDate:\'day\':true"></span>, </span> <span ng-bind="(event.tempStartsAt || event.startsAt) | calendarDate:\'time\':true"></span> </span> <a href=javascript:; class=event-item ng-click="vm.onEventClick({calendarEvent: event})"> <span ng-bind-html="vm.calendarEventTitle.dayView(event) | calendarTrustAsHtml"></span> </a> <a href=javascript:; class=event-item-edit ng-if="vm.editEventHtml && event.editable !== false" ng-bind-html="vm.editEventHtml | calendarTrustAsHtml" ng-click="vm.onEditEventClick({calendarEvent: event})"> </a> <a href=javascript:; class=event-item-delete ng-if="vm.deleteEventHtml && event.deletable !== false" ng-bind-html="vm.deleteEventHtml | calendarTrustAsHtml" ng-click="vm.onDeleteEventClick({calendarEvent: event})"> </a> </div> </div> </div>'
	}, function(e, t) {
		e.exports =
			'<div class=cal-day-panel-hour> <div class=cal-day-hour ng-repeat="hour in vm.hours track by $index"> <div class=cal-day-hour-part ng-class="{ \'cal-day-hour-part-selected\': vm.dateRangeSelect &&\n                vm.dateRangeSelect.startDate <= vm.getClickedDate(hour.date, vm.dayViewSplit * $index) &&\n                vm.getClickedDate(hour.date, vm.dayViewSplit * $index) < vm.dateRangeSelect.endDate }" ng-repeat="chunk in vm.hourChunks track by chunk" ng-click="vm.onTimespanClick({calendarDate: vm.getClickedDate(hour.date, vm.dayViewSplit * $index)})" mwl-droppable on-drop="vm.eventDropped(dropData.event, vm.getClickedDate(hour.date, vm.dayViewSplit * $index))" mwl-drag-select=!!vm.onDateRangeSelect on-drag-select-start="vm.onDragSelectStart(vm.getClickedDate(hour.date, vm.dayViewSplit * $index))" on-drag-select-move="vm.onDragSelectMove(vm.getClickedDate(hour.date, vm.dayViewSplit * ($index + 1)))" on-drag-select-end="vm.onDragSelectEnd(vm.getClickedDate(hour.date, vm.dayViewSplit * ($index + 1)))" ng-if=!vm.dayWidth> <div class=cal-day-hour-part-time> <strong ng-bind=hour.label ng-show=$first></strong> </div> </div> <div class=cal-day-hour-part ng-repeat="chunk in vm.hourChunks track by chunk" ng-if=vm.dayWidth> <div class=cal-day-hour-part-time> <strong ng-bind=hour.label ng-show=$first></strong> &nbsp; </div> <div class=cal-day-hour-part-spacer ng-repeat="dayIndex in [0, 1, 2, 3, 4, 5, 6]" ng-style="{width: vm.dayWidth + \'px\'}" ng-class="{ \'cal-day-hour-part-selected\': vm.dateRangeSelect &&\n                vm.dateRangeSelect.startDate <= vm.getClickedDate(hour.date, vm.dayViewSplit * $parent.$index, dayIndex) &&\n                vm.getClickedDate(hour.date, vm.dayViewSplit * $parent.$index, dayIndex) < vm.dateRangeSelect.endDate }" ng-click="vm.onTimespanClick({calendarDate: vm.getClickedDate(hour.date, vm.dayViewSplit * $parent.$index, dayIndex)})" mwl-droppable on-drop="vm.eventDropped(dropData.event, vm.getClickedDate(hour.date, vm.dayViewSplit * $parent.$index, dayIndex))" mwl-drag-select=!!vm.onDateRangeSelect on-drag-select-start="vm.onDragSelectStart(vm.getClickedDate(hour.date, vm.dayViewSplit * $parent.$index, dayIndex), dayIndex)" on-drag-select-move="vm.onDragSelectMove(vm.getClickedDate(hour.date, vm.dayViewSplit * ($parent.$index + 1), vm.dateRangeSelect.dayIndex))" on-drag-select-end="vm.onDragSelectEnd(vm.getClickedDate(hour.date, vm.dayViewSplit * ($parent.$index + 1), vm.dateRangeSelect.dayIndex))"> </div> </div> </div> </div>'
	}, function(e, t) {
		e.exports =
			'<div mwl-droppable on-drop="vm.handleEventDrop(dropData.event, day.date, dropData.draggedFromDate)" class="cal-month-day {{ day.cssClass }}" ng-class="{\n    \'cal-day-outmonth\': !day.inMonth,\n    \'cal-day-inmonth\': day.inMonth,\n    \'cal-day-weekend\': day.isWeekend,\n    \'cal-day-past\': day.isPast,\n    \'cal-day-today\': day.isToday,\n    \'cal-day-future\': day.isFuture\n  }"> <small class="cal-events-num badge badge-important pull-left" ng-show="day.badgeTotal > 0" ng-bind=day.badgeTotal> </small> <span class=pull-right data-cal-date ng-click=vm.calendarCtrl.dateClicked(day.date) ng-bind=day.label> </span> <div class=cal-day-tick ng-show="dayIndex === vm.openDayIndex && vm.view[vm.openDayIndex].events.length > 0 && !vm.slideBoxDisabled"> <i class="glyphicon glyphicon-chevron-up"></i> <i class="fa fa-chevron-up"></i> </div> <ng-include src="vm.customTemplateUrls.calendarMonthCellEvents || vm.calendarConfig.templates.calendarMonthCellEvents"></ng-include> <div id=cal-week-box ng-if="$first && rowHovered"> <span ng-bind="vm.calendarConfig.i18nStrings.weekNumber.replace(\'{week}\', day.date.clone().add(1, \'day\').isoWeek())"></span> </div> </div>'
	}, function(e, t) {
		e.exports =
			'<div class=events-list ng-show="day.events.length > 0"> <a ng-repeat="event in day.events | orderBy:\'startsAt\' track by event.$id" href=javascript:; ng-click="$event.stopPropagation(); vm.onEventClick({calendarEvent: event})" class="pull-left event" ng-class="\'event-\' + event.type + \' \' + event.cssClass" ng-mouseenter="vm.highlightEvent(event, true)" ng-mouseleave="vm.highlightEvent(event, false)" tooltip-append-to-body=true uib-tooltip-html="vm.calendarEventTitle.monthViewTooltip(event) | calendarTrustAsHtml" mwl-draggable="event.draggable === true" drop-data="{event: event, draggedFromDate: day.date.toDate()}"> </a> </div>'
	}, function(e, t) {
		e.exports =
			'<div class="cal-row-fluid cal-row-head"> <div class=cal-cell1 ng-repeat="day in vm.weekDays track by $index" ng-bind=day></div> </div> <div class=cal-month-box> <div ng-repeat="rowOffset in vm.monthOffsets track by rowOffset" ng-mouseenter="rowHovered = true" ng-mouseleave="rowHovered = false"> <div class="cal-row-fluid cal-before-eventlist"> <div ng-repeat="day in vm.view | calendarLimitTo:7:rowOffset track by $index" ng-init="dayIndex = vm.view.indexOf(day)" class="cal-cell1 cal-cell {{ day.highlightClass }}" ng-click="vm.dayClicked(day, false, $event)" ng-class="{pointer: day.events.length > 0}"> <ng-include src="vm.customTemplateUrls.calendarMonthCell || vm.calendarConfig.templates.calendarMonthCell"></ng-include> </div> </div> <mwl-calendar-slide-box is-open="vm.openRowIndex === $index && vm.view[vm.openDayIndex].events.length > 0 && !vm.slideBoxDisabled" events=vm.view[vm.openDayIndex].events on-event-click=vm.onEventClick edit-event-html=vm.editEventHtml on-edit-event-click=vm.onEditEventClick delete-event-html=vm.deleteEventHtml on-delete-event-click=vm.onDeleteEventClick cell=vm.view[vm.openDayIndex] custom-template-urls=vm.customTemplateUrls> </mwl-calendar-slide-box> </div> </div>'
	}, function(e, t) {
		e.exports =
			'<div class=cal-slide-box uib-collapse=vm.isCollapsed mwl-collapse-fallback=vm.isCollapsed> <div class="cal-slide-content cal-event-list"> <ul class="unstyled list-unstyled"> <li ng-repeat="event in vm.events | orderBy:\'startsAt\' track by event.$id" ng-class=event.cssClass mwl-draggable="event.draggable === true" drop-data="{event: event}"> <span class="pull-left event" ng-class="\'event-\' + event.type"></span> &nbsp; <a href=javascript:; class=event-item ng-click="vm.onEventClick({calendarEvent: event})"> <span ng-bind-html="isMonthView ? vm.calendarEventTitle.monthView(event) : vm.calendarEventTitle.yearView(event) | calendarTrustAsHtml"></span> </a> <a href=javascript:; class=event-item-edit ng-if="vm.editEventHtml && event.editable !== false" ng-bind-html="vm.editEventHtml | calendarTrustAsHtml" ng-click="vm.onEditEventClick({calendarEvent: event})"> </a> <a href=javascript:; class=event-item-delete ng-if="vm.deleteEventHtml && event.deletable !== false" ng-bind-html="vm.deleteEventHtml | calendarTrustAsHtml" ng-click="vm.onDeleteEventClick({calendarEvent: event})"> </a> </li> </ul> </div> </div>'
	}, function(e, t) {
		e.exports =
			"<div class=cal-week-box ng-class=\"{'cal-day-box': vm.showTimes}\"> <div class=\"cal-row-fluid cal-row-head\"> <div class=cal-cell1 ng-repeat=\"day in vm.view.days track by $index\" ng-class=\"{\n        'cal-day-weekend': day.isWeekend,\n        'cal-day-past': day.isPast,\n        'cal-day-today': day.isToday,\n        'cal-day-future': day.isFuture}\" mwl-element-dimensions=vm.dayColumnDimensions mwl-droppable on-drop=\"vm.eventDropped(dropData.event, day.date)\"> <span ng-bind=day.weekDayLabel></span> <br> <small> <span data-cal-date ng-click=vm.calendarCtrl.dateClicked(day.date) class=pointer ng-bind=day.dayLabel> </span> </small> </div> </div> <div class=\"cal-day-panel clearfix\" ng-style=\"{height: vm.showTimes ? (vm.dayViewHeight + 'px') : 'auto'}\"> <mwl-calendar-hour-list day-view-start=vm.dayViewStart day-view-end=vm.dayViewEnd day-view-split=vm.dayViewSplit day-width=vm.dayColumnDimensions.width view-date=vm.viewDate on-timespan-click=vm.onTimespanClick on-date-range-select=vm.onDateRangeSelect custom-template-urls=vm.customTemplateUrls ng-if=vm.showTimes> </mwl-calendar-hour-list> <div class=row ng-repeat=\"row in vm.view.eventRows track by $index\"> <div class=col-xs-12> <div class=cal-row-fluid> <div ng-repeat=\"eventRow in row.row track by eventRow.event.$id\" ng-class=\"'cal-cell' + (vm.showTimes ? 1 : eventRow.span) + (vm.showTimes ? '' : ' cal-offset' + eventRow.offset)\" ng-style=\"{\n              top: vm.showTimes ? ((eventRow.event.top + 2) + 'px') : 'auto',\n              position: vm.showTimes ? 'absolute' : 'inherit',\n              width: vm.showTimes ? (vm.dayColumnDimensions.width + 'px') : '',\n              left: vm.showTimes ? (vm.dayColumnDimensions.width * eventRow.offset) + 15 + 'px' : ''\n            }\"> <div class=day-highlight ng-class=\"['dh-event-' + eventRow.event.type, eventRow.event.cssClass, !vm.showTimes && eventRow.extendsLeft ? '' : 'border-left-rounded', !vm.showTimes && eventRow.extendsRight ? '' : 'border-right-rounded']\" data-event-class mwl-draggable=\"eventRow.event.draggable === true\" axis=\"vm.showTimes ? 'xy' : 'x'\" snap-grid=\"vm.showTimes ? {x: vm.dayColumnDimensions.width, y: vm.dayViewEventChunkSize || 30} : {x: vm.dayColumnDimensions.width}\" on-drag=\"vm.tempTimeChanged(eventRow.event, y / 30)\" on-drag-end=\"vm.weekDragged(eventRow.event, x / vm.dayColumnDimensions.width, y / 30)\" mwl-resizable=\"eventRow.event.resizable === true && eventRow.event.endsAt && !vm.showTimes\" resize-edges=\"{left: true, right: true}\" on-resize-end=\"vm.weekResized(eventRow.event, edge, x / vm.dayColumnDimensions.width)\"> <strong ng-bind=\"(eventRow.event.tempStartsAt || eventRow.event.startsAt) | calendarDate:'time':true\" ng-show=vm.showTimes></strong> <a href=javascript:; ng-click=\"vm.onEventClick({calendarEvent: eventRow.event})\" class=event-item ng-bind-html=\"vm.calendarEventTitle.weekView(eventRow.event) | calendarTrustAsHtml\" uib-tooltip-html=\"vm.calendarEventTitle.weekViewTooltip(eventRow.event) | calendarTrustAsHtml\" tooltip-placement=left tooltip-append-to-body=true> </a> </div> </div> </div> </div> </div> </div> </div>"
	}, function(e, t) {
		e.exports =
			'<div class=cal-year-box> <div ng-repeat="rowOffset in [0, 4, 8] track by rowOffset"> <div class="row cal-before-eventlist"> <div class="span3 col-md-3 col-xs-6 cal-cell {{ day.cssClass }}" ng-repeat="month in vm.view | calendarLimitTo:4:rowOffset track by $index" ng-init="monthIndex = vm.view.indexOf(month)" ng-click="vm.monthClicked(month, false, $event)" ng-class="{pointer: month.events.length > 0, \'cal-day-today\': month.isToday}" mwl-droppable on-drop="vm.handleEventDrop(dropData.event, month.date)"> <span class=pull-right data-cal-date ng-click=vm.calendarCtrl.dateClicked(month.date) ng-bind=month.label> </span> <small class="cal-events-num badge badge-important pull-left" ng-show="month.badgeTotal > 0" ng-bind=month.badgeTotal> </small> <div class=cal-day-tick ng-show="monthIndex === vm.openMonthIndex && vm.view[vm.openMonthIndex].events.length > 0 && !vm.slideBoxDisabled"> <i class="glyphicon glyphicon-chevron-up"></i> <i class="fa fa-chevron-up"></i> </div> </div> </div> <mwl-calendar-slide-box is-open="vm.openRowIndex === $index && vm.view[vm.openMonthIndex].events.length > 0 && !vm.slideBoxDisabled" events=vm.view[vm.openMonthIndex].events on-event-click=vm.onEventClick edit-event-html=vm.editEventHtml on-edit-event-click=vm.onEditEventClick delete-event-html=vm.deleteEventHtml on-delete-event-click=vm.onDeleteEventClick cell=vm.view[vm.openMonthIndex] custom-template-urls=vm.customTemplateUrls> </mwl-calendar-slide-box> </div> </div>'
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCalendarCtrl", ["$scope", "$log",
			"$timeout", "$attrs", "$locale", "moment", "calendarTitle",
			"calendarHelper",
			function(e, t, n, r, i, l, d, o) {
				function s(e) {
					return e.startsAt ? a.isDate(e.startsAt) || t.warn(
						"Bootstrap calendar: ",
						"Event startsAt should be a javascript date object. Do `new Date(event.startsAt)` to fix it.",
						e) : t.warn("Bootstrap calendar: ",
						"Event is missing the startsAt field", e), e.endsAt && (a.isDate(e
						.endsAt) || t.warn("Bootstrap calendar: ",
						"Event endsAt should be a javascript date object. Do `new Date(event.endsAt)` to fix it.",
						e), l(e.startsAt).isAfter(l(e.endsAt)) && t.warn(
						"Bootstrap calendar: ", "Event cannot start after it finishes", e
					)), !0
				}

				function c() {
					d[v.view] && a.isDefined(r.viewTitle) && (v.viewTitle = d[v.view](v.viewDate)),
						v.events = v.events.filter(s).map(function(e, t) {
							return Object.defineProperty(e, "$id", {
								enumerable: !1,
								configurable: !0,
								value: t
							}), e
						});
					var t = l(v.viewDate),
						i = !0;
					m.clone().startOf(v.view).isSame(t.clone().startOf(v.view)) && !m.isSame(
						t) && v.view === u && (i = !1), m = t, u = v.view, i && n(function() {
						e.$broadcast("calendar.refreshView")
					})
				}
				var v = this;
				v.events = v.events || [], v.changeView = function(e, t) {
					v.view = e, v.viewDate = t
				}, v.dateClicked = function(e) {
					var t = l(e).toDate(),
						n = {
							year: "month",
							month: "day",
							week: "day"
						};
					v.onViewChangeClick({
						calendarDate: t,
						calendarNextView: n[v.view]
					}) !== !1 && v.changeView(n[v.view], t)
				};
				var m = l(v.viewDate),
					u = v.view;
				o.loadTemplates().then(function() {
					v.templatesLoaded = !0;
					var t = !1;
					e.$watchGroup(["vm.viewDate", "vm.view", "vm.cellIsOpen", function() {
						return l.locale() + i.id
					}], function() {
						t ? c() : (t = !0, e.$watch("vm.events", c, !0))
					})
				})["catch"](function(e) {
					t.error("Could not load all calendar templates", e)
				})
			}
		]).directive("mwlCalendar", function() {
			return {
				template: '<div mwl-dynamic-directive-template name="calendar" overrides="vm.customTemplateUrls"></div>',
				restrict: "E",
				scope: {
					events: "=",
					view: "=",
					viewTitle: "=?",
					viewDate: "=",
					editEventHtml: "=?",
					deleteEventHtml: "=?",
					cellIsOpen: "=?",
					slideBoxDisabled: "=?",
					customTemplateUrls: "=?",
					onEventClick: "&",
					onEventTimesChanged: "&",
					onEditEventClick: "&",
					onDeleteEventClick: "&",
					onTimespanClick: "&",
					onDateRangeSelect: "&?",
					onViewChangeClick: "&",
					cellModifier: "&",
					dayViewStart: "@",
					dayViewEnd: "@",
					dayViewSplit: "@",
					dayViewEventChunkSize: "@"
				},
				controller: "MwlCalendarCtrl as vm",
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCalendarDayCtrl", ["$scope",
			"moment", "calendarHelper", "calendarEventTitle",
			function(e, t, n, a) {
				function r() {
					i.dayViewSplit = i.dayViewSplit || 30, i.dayViewHeight = n.getDayViewHeight(
						i.dayViewStart, i.dayViewEnd, i.dayViewSplit);
					var e = n.getDayView(i.events, i.viewDate, i.dayViewStart, i.dayViewEnd,
						i.dayViewSplit);
					i.allDayEvents = e.filter(function(e) {
						return e.allDay
					}), i.nonAllDayEvents = e.filter(function(e) {
						return !e.allDay
					})
				}
				var i = this;
				i.calendarEventTitle = a, e.$on("calendar.refreshView", r), e.$watchGroup(
						["vm.dayViewStart", "vm.dayViewEnd", "vm.dayViewSplit"], r), i.eventDragComplete =
					function(e, n) {
						var a = n * i.dayViewSplit,
							r = t(e.startsAt).add(a, "minutes"),
							l = t(e.endsAt).add(a, "minutes");
						delete e.tempStartsAt, i.onEventTimesChanged({
							calendarEvent: e,
							calendarNewEventStart: r.toDate(),
							calendarNewEventEnd: e.endsAt ? l.toDate() : null
						})
					}, i.eventDragged = function(e, n) {
						var a = n * i.dayViewSplit;
						e.tempStartsAt = t(e.startsAt).add(a, "minutes").toDate()
					}, i.eventResizeComplete = function(e, n, a) {
						var r = a * i.dayViewSplit,
							l = t(e.startsAt),
							d = t(e.endsAt);
						"start" === n ? l.add(r, "minutes") : d.add(r, "minutes"), delete e
							.tempStartsAt, i.onEventTimesChanged({
								calendarEvent: e,
								calendarNewEventStart: l.toDate(),
								calendarNewEventEnd: d.toDate()
							})
					}, i.eventResized = function(e, n, a) {
						var r = a * i.dayViewSplit;
						"start" === n && (e.tempStartsAt = t(e.startsAt).add(r, "minutes").toDate())
					}
			}
		]).directive("mwlCalendarDay", function() {
			return {
				template: '<div mwl-dynamic-directive-template name="calendarDayView" overrides="vm.customTemplateUrls"></div>',
				restrict: "E",
				require: "^mwlCalendar",
				scope: {
					events: "=",
					viewDate: "=",
					onEventClick: "=",
					onEventTimesChanged: "=",
					onTimespanClick: "=",
					onDateRangeSelect: "=",
					dayViewStart: "=",
					dayViewEnd: "=",
					dayViewSplit: "=",
					dayViewEventChunkSize: "=",
					onEditEventClick: "=",
					onDeleteEventClick: "=",
					editEventHtml: "=",
					deleteEventHtml: "=",
					customTemplateUrls: "=?"
				},
				controller: "MwlCalendarDayCtrl as vm",
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCalendarHourListCtrl", ["$scope",
			"$attrs", "moment", "calendarConfig", "calendarHelper",
			function(e, t, n, a, r) {
				function i() {
					l = n(o.dayViewStart || "00:00", "HH:mm"), d = n(o.dayViewEnd ||
						"23:00", "HH:mm"), o.dayViewSplit = parseInt(o.dayViewSplit), o.hours = [];
					var e = n(o.viewDate).clone();
					t.dayWidth && (e = e.startOf("week")), e.hours(l.hours()).minutes(l.minutes())
						.seconds(l.seconds());
					for (var i = 0; i <= d.diff(l, "hours"); i++) o.hours.push({
						label: r.formatDate(e, a.dateFormats.hour),
						date: e.clone()
					}), e.add(1, "hour");
					o.hourChunks = [];
					for (var s = 0; s < 60 / o.dayViewSplit; s++) o.hourChunks.push(s)
				}
				var l, d, o = this,
					s = n.locale();
				e.$on("calendar.refreshView", function() {
					s !== n.locale() && (s = n.locale(), i())
				}), e.$watchGroup(["vm.dayViewStart", "vm.dayViewEnd",
					"vm.dayViewSplit", "vm.viewDate"
				], function() {
					i()
				}), o.eventDropped = function(e, t) {
					var a = n(t),
						i = r.adjustEndDateFromStartDiff(e.startsAt, a, e.endsAt);
					o.onEventTimesChanged({
						calendarEvent: e,
						calendarDate: t,
						calendarNewEventStart: a.toDate(),
						calendarNewEventEnd: i ? i.toDate() : null
					})
				}, o.getClickedDate = function(e, t, a) {
					return n(e).clone().add(t, "minutes").add(a || 0, "days").toDate()
				}, o.onDragSelectStart = function(e, t) {
					o.dateRangeSelect || (o.dateRangeSelect = {
						active: !0,
						startDate: e,
						endDate: e,
						dayIndex: t
					})
				}, o.onDragSelectMove = function(e) {
					o.dateRangeSelect && (o.dateRangeSelect.endDate = e)
				}, o.onDragSelectEnd = function(e) {
					o.dateRangeSelect.endDate = e, o.dateRangeSelect.endDate > o.dateRangeSelect
						.startDate && o.onDateRangeSelect({
							calendarRangeStartDate: o.dateRangeSelect.startDate,
							calendarRangeEndDate: o.dateRangeSelect.endDate
						}), delete o.dateRangeSelect
				}
			}
		]).directive("mwlCalendarHourList", function() {
			return {
				restrict: "E",
				template: '<div mwl-dynamic-directive-template name="calendarHourList" overrides="vm.customTemplateUrls"></div>',
				controller: "MwlCalendarHourListCtrl as vm",
				scope: {
					viewDate: "=",
					dayViewStart: "=",
					dayViewEnd: "=",
					dayViewSplit: "=",
					dayWidth: "=?",
					onTimespanClick: "=",
					onDateRangeSelect: "=",
					onEventTimesChanged: "=",
					customTemplateUrls: "=?"
				},
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCalendarMonthCtrl", ["$scope",
			"moment", "calendarHelper", "calendarConfig", "calendarEventTitle",
			function(e, t, n, a, r) {
				var i = this;
				i.calendarConfig = a, i.calendarEventTitle = r, i.openRowIndex = null,
					e.$on("calendar.refreshView", function() {
						i.weekDays = n.getWeekDayNames(), i.view = n.getMonthView(i.events,
							i.viewDate, i.cellModifier);
						var e = Math.floor(i.view.length / 7);
						i.monthOffsets = [];
						for (var a = 0; e > a; a++) i.monthOffsets.push(7 * a);
						i.cellIsOpen && null === i.openRowIndex && (i.openDayIndex = null,
							i.view.forEach(function(e) {
								e.inMonth && t(i.viewDate).startOf("day").isSame(e.date) && i.dayClicked(
									e, !0)
							}))
					}), i.dayClicked = function(e, t, n) {
						if (t || (i.onTimespanClick({
								calendarDate: e.date.toDate(),
								calendarCell: e,
								$event: n
							}), !n || !n.defaultPrevented)) {
							i.openRowIndex = null;
							var a = i.view.indexOf(e);
							a === i.openDayIndex ? (i.openDayIndex = null, i.cellIsOpen = !1) :
								(i.openDayIndex = a, i.openRowIndex = Math.floor(a / 7), i.cellIsOpen = !
									0)
						}
					}, i.highlightEvent = function(e, t) {
						i.view.forEach(function(n) {
							if (delete n.highlightClass, t) {
								var a = n.events.indexOf(e) > -1;
								a && (n.highlightClass = "day-highlight dh-event-" + e.type)
							}
						})
					}, i.handleEventDrop = function(e, a, r) {
						var l = t(e.startsAt).date(t(a).date()).month(t(a).month()).year(t(
								a).year()),
							d = n.adjustEndDateFromStartDiff(e.startsAt, l, e.endsAt);
						i.onEventTimesChanged({
							calendarEvent: e,
							calendarDate: a,
							calendarNewEventStart: l.toDate(),
							calendarNewEventEnd: d ? d.toDate() : null,
							calendarDraggedFromDate: r
						})
					}
			}
		]).directive("mwlCalendarMonth", function() {
			return {
				template: '<div mwl-dynamic-directive-template name="calendarMonthView" overrides="vm.customTemplateUrls"></div>',
				restrict: "E",
				require: "^mwlCalendar",
				scope: {
					events: "=",
					viewDate: "=",
					onEventClick: "=",
					onEditEventClick: "=",
					onDeleteEventClick: "=",
					onEventTimesChanged: "=",
					editEventHtml: "=",
					deleteEventHtml: "=",
					cellIsOpen: "=",
					onTimespanClick: "=",
					cellModifier: "=",
					slideBoxDisabled: "=",
					customTemplateUrls: "=?"
				},
				controller: "MwlCalendarMonthCtrl as vm",
				link: function(e, t, n, a) {
					e.vm.calendarCtrl = a
				},
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCalendarSlideBoxCtrl", ["$scope",
			"$timeout", "calendarConfig", "calendarEventTitle",
			function(e, t, n, a) {
				var r = this;
				r.calendarConfig = n, r.calendarEventTitle = a, r.isCollapsed = !0, e
					.$watch("vm.isOpen", function(e) {
						t(function() {
							r.isCollapsed = !e
						})
					})
			}
		]).directive("mwlCalendarSlideBox", function() {
			return {
				restrict: "E",
				template: '<div mwl-dynamic-directive-template name="calendarSlideBox" overrides="vm.customTemplateUrls"></div>',
				replace: !0,
				controller: "MwlCalendarSlideBoxCtrl as vm",
				require: ["^?mwlCalendarMonth", "^?mwlCalendarYear"],
				link: function(e, t, n, a) {
					e.isMonthView = !!a[0], e.isYearView = !!a[1]
				},
				scope: {
					isOpen: "=",
					events: "=",
					onEventClick: "=",
					editEventHtml: "=",
					onEditEventClick: "=",
					deleteEventHtml: "=",
					onDeleteEventClick: "=",
					cell: "=",
					customTemplateUrls: "=?"
				},
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCalendarWeekCtrl", ["$scope",
			"moment", "calendarHelper", "calendarConfig", "calendarEventTitle",
			function(e, t, n, a, r) {
				var i = this;
				i.showTimes = a.showTimesOnWeekView, i.calendarEventTitle = r, e.$on(
					"calendar.refreshView",
					function() {
						i.dayViewSplit = i.dayViewSplit || 30, i.dayViewHeight = n.getDayViewHeight(
								i.dayViewStart, i.dayViewEnd, i.dayViewSplit), i.showTimes ? i.view =
							n.getWeekViewWithTimes(i.events, i.viewDate, i.dayViewStart, i.dayViewEnd,
								i.dayViewSplit) : i.view = n.getWeekView(i.events, i.viewDate)
					}), i.weekDragged = function(e, n, a) {
					var r = t(e.startsAt).add(n, "days"),
						l = t(e.endsAt).add(n, "days");
					if (a) {
						var d = a * i.dayViewSplit;
						r = r.add(d, "minutes"), l = l.add(d, "minutes")
					}
					delete e.tempStartsAt, i.onEventTimesChanged({
						calendarEvent: e,
						calendarNewEventStart: r.toDate(),
						calendarNewEventEnd: e.endsAt ? l.toDate() : null
					})
				}, i.eventDropped = function(e, n) {
					var a = t(n).diff(t(e.startsAt), "days");
					i.weekDragged(e, a)
				}, i.weekResized = function(e, n, a) {
					var r = t(e.startsAt),
						l = t(e.endsAt);
					"start" === n ? r.add(a, "days") : l.add(a, "days"), i.onEventTimesChanged({
						calendarEvent: e,
						calendarNewEventStart: r.toDate(),
						calendarNewEventEnd: l.toDate()
					})
				}, i.tempTimeChanged = function(e, n) {
					var a = n * i.dayViewSplit;
					e.tempStartsAt = t(e.startsAt).add(a, "minutes").toDate()
				}
			}
		]).directive("mwlCalendarWeek", function() {
			return {
				template: '<div mwl-dynamic-directive-template name="calendarWeekView" overrides="vm.customTemplateUrls"></div>',
				restrict: "E",
				require: "^mwlCalendar",
				scope: {
					events: "=",
					viewDate: "=",
					onEventClick: "=",
					onEventTimesChanged: "=",
					dayViewStart: "=",
					dayViewEnd: "=",
					dayViewSplit: "=",
					dayViewEventChunkSize: "=",
					onTimespanClick: "=",
					onDateRangeSelect: "=",
					customTemplateUrls: "=?"
				},
				controller: "MwlCalendarWeekCtrl as vm",
				link: function(e, t, n, a) {
					e.vm.calendarCtrl = a
				},
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCalendarYearCtrl", ["$scope",
			"moment", "calendarHelper",
			function(e, t, n) {
				var a = this;
				a.openMonthIndex = null, e.$on("calendar.refreshView", function() {
					a.view = n.getYearView(a.events, a.viewDate, a.cellModifier), a.cellIsOpen &&
						null === a.openMonthIndex && (a.openMonthIndex = null, a.view.forEach(
							function(e) {
								t(a.viewDate).startOf("month").isSame(e.date) && a.monthClicked(
									e, !0)
							}))
				}), a.monthClicked = function(e, t, n) {
					if (t || (a.onTimespanClick({
							calendarDate: e.date.toDate(),
							calendarCell: e,
							$event: n
						}), !n || !n.defaultPrevented)) {
						a.openRowIndex = null;
						var r = a.view.indexOf(e);
						r === a.openMonthIndex ? (a.openMonthIndex = null,
							a.cellIsOpen = !1) : (a.openMonthIndex = r, a.openRowIndex =
							Math.floor(r / 4), a.cellIsOpen = !0)
					}
				}, a.handleEventDrop = function(e, r) {
					var i = t(e.startsAt).month(t(r).month()).year(t(r).year()),
						l = n.adjustEndDateFromStartDiff(e.startsAt, i, e.endsAt);
					a.onEventTimesChanged({
						calendarEvent: e,
						calendarDate: r,
						calendarNewEventStart: i.toDate(),
						calendarNewEventEnd: l ? l.toDate() : null
					})
				}
			}
		]).directive("mwlCalendarYear", function() {
			return {
				template: '<div mwl-dynamic-directive-template name="calendarYearView" overrides="vm.customTemplateUrls"></div>',
				restrict: "E",
				require: "^mwlCalendar",
				scope: {
					events: "=",
					viewDate: "=",
					onEventClick: "=",
					onEventTimesChanged: "=",
					onEditEventClick: "=",
					onDeleteEventClick: "=",
					editEventHtml: "=",
					deleteEventHtml: "=",
					cellIsOpen: "=",
					onTimespanClick: "=",
					cellModifier: "=",
					slideBoxDisabled: "=",
					customTemplateUrls: "=?"
				},
				controller: "MwlCalendarYearCtrl as vm",
				link: function(e, t, n, a) {
					e.vm.calendarCtrl = a
				},
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlCollapseFallbackCtrl", ["$scope",
			"$attrs", "$element",
			function(e, t, n) {
				e.$watch(t.mwlCollapseFallback, function(e) {
					e ? n.addClass("ng-hide") : n.removeClass("ng-hide")
				})
			}
		]).directive("mwlCollapseFallback", ["$injector", function(e) {
			return e.has("uibCollapseDirective") ? {} : {
				restrict: "A",
				controller: "MwlCollapseFallbackCtrl"
			}
		}])
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlDateModifierCtrl", ["$element",
			"$attrs", "$scope", "moment","calendarBlock",
			function(e, t, n, r, calendarBlock) {
				function i() {
					var currDate = l.date;
					a.isDefined(t.setToToday) ? l.date = new Date : a.isDefined(t.increment) ?
						l.date = r(l.date).add(1, l.increment).toDate() : a.isDefined(t.decrement) &&
						(l.date = r(l.date).subtract(1, l.decrement).toDate()), n.$apply()
					
					
					if(l.increment == 'year' || l.decrement == 'year'){
						if(l.increment == 'year'){
							console.log('Added '+ l.increment +' to'+currDate+'. It\'s now '+l.date);
						}
						else if(l.decrement == 'year'){
							console.log('Subtracted '+ l.decrement +' to'+currDate+'. It\'s now '+l.date);
						}
					}
					else if(l.increment == 'month' || l.decrement == 'month'){
						if(l.increment == 'month'){
							console.log('Added '+ l.increment +' to'+currDate+'. It\'s now '+l.date);
						}
						else if(l.decrement == 'month'){
							console.log('Subtracted '+ l.decrement +' to'+currDate+'. It\'s now '+l.date);
						}
					}
					else if(l.increment == 'week' || l.decrement == 'week'){
						if(l.increment == 'week'){
							console.log('Added '+ l.increment +' to'+currDate+'. It\'s now '+l.date);
						}
						else if(l.decrement == 'week'){
							console.log('Subtracted '+ l.decrement +' to'+currDate+'. It\'s now '+l.date);
						}
					}
					else if(l.increment == 'day' || l.decrement == 'day'){
						if(l.increment == 'day'){
							console.log('Added '+ l.increment +' to'+currDate+'. It\'s now '+l.date);
						}
						else if(l.decrement == 'day'){
							console.log('Subtracted '+ l.decrement +' to'+currDate+'. It\'s now '+l.date);
						}
					}

					calendarBlock.data.start = l.date;


				}
				var l = this;
				e.bind("click", i), n.$on("$destroy", function() {
					e.unbind("click", i)
				})
			}
		]).directive("mwlDateModifier", function() {
			return {
				restrict: "A",
				controller: "MwlDateModifierCtrl as vm",
				scope: {
					date: "=",
					increment: "=",
					decrement: "="
				},
				bindToController: !0
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlDragSelectCtrl", ["$scope",
			"$element", "$parse", "$attrs",
			function(e, t, n, a) {
				function r(t) {
					return function(a) {
						t && (n(t)(e), e.$apply()), a.preventDefault()
					}
				}

				function i() {
					t.on("mousedown", d), t.on("mousemove", o), t.on("mouseup", s)
				}

				function l() {
					t.off("mousedown", d), t.off("mousemove", o), t.off("mouseup", s)
				}
				var d = r(a.onDragSelectStart),
					o = r(a.onDragSelectMove),
					s = r(a.onDragSelectEnd);
				e.$watch(a.mwlDragSelect, function(e) {
					e ? i() : l()
				}), e.$on("$destroy", function() {
					l()
				})
			}
		]).directive("mwlDragSelect", function() {
			return {
				restrict: "A",
				controller: "MwlDragSelectCtrl"
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlDraggableCtrl", ["$element",
			"$scope", "$window", "$parse", "$attrs", "$timeout", "interact",
			function(e, t, n, r, i, l, d) {
				function o(e, t) {
					return e.css("-ms-transform", t).css("-webkit-transform", t).css(
						"transform", t)
				}
				if (d) {
					var s, c;
					i.snapGrid && (c = r(i.snapGrid)(t), s = {
						targets: [d.createSnapGrid(c)]
					}), d(e[0]).draggable({
						snap: s,
						onstart: function(e) {
							a.element(e.target).addClass("dragging-active"), e.target.dropData =
								r(i.dropData)(t), e.target.style.pointerEvents = "none", i.onDragStart &&
								(r(i.onDragStart)(t), t.$apply())
						},
						onmove: function(e) {
							var l = a.element(e.target),
								d = (parseFloat(l.attr("data-x")) || 0) + (e.dx || 0),
								s = (parseFloat(l.attr("data-y")) || 0) + (e.dy || 0);
							switch (r(i.axis)(t)) {
								case "x":
									s = 0;
									break;
								case "y":
									d = 0
							}
							"static" === n.getComputedStyle(l[0]).position && l.css(
									"position", "relative"), o(l, "translate(" + d + "px, " + s +
									"px)").css("z-index", 50).attr("data-x", d).attr("data-y", s),
								i.onDrag && (r(i.onDrag)(t, {
									x: d,
									y: s
								}), t.$apply())
						},
						onend: function(e) {
							var n = a.element(e.target),
								d = n.attr("data-x"),
								s = n.attr("data-y");
							e.target.style.pointerEvents = "auto", i.onDragEnd && (r(i.onDragEnd)
								(t, {
									x: d,
									y: s
								}), t.$apply()), l(function() {
								o(n, "").css("z-index", "auto").removeAttr("data-x").removeAttr(
									"data-y").removeClass("dragging-active")
							})
						}
					}), t.$watch(i.mwlDraggable, function(t) {
						d(e[0]).draggable({
							enabled: t
						})
					}), t.$on("$destroy", function() {
						d(e[0]).unset()
					})
				}
			}
		]).directive("mwlDraggable", function() {
			return {
				restrict: "A",
				controller: "MwlDraggableCtrl"
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlDroppableCtrl", ["$element",
			"$scope", "$parse", "$attrs", "interact",
			function(e, t, n, r, i) {
				if (i) {
					var l = r.dropActiveClass || "drop-active";
					i(e[0]).dropzone({
						ondragenter: function(e) {
							a.element(e.target).addClass(l)
						},
						ondragleave: function(e) {
							a.element(e.target).removeClass(l)
						},
						ondropdeactivate: function(e) {
							a.element(e.target).removeClass(l)
						},
						ondrop: function(e) {
							e.relatedTarget.dropData && (n(r.onDrop)(t, {
								dropData: e.relatedTarget.dropData
							}), t.$apply())
						}
					}), t.$on("$destroy", function() {
						i(e[0]).unset()
					})
				}
			}
		]).directive("mwlDroppable", function() {
			return {
				restrict: "A",
				controller: "MwlDroppableCtrl"
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlDynamicDirectiveTemplateCtrl", [
			"$compile", "$scope", "$attrs", "$element", "$templateCache",
			"calendarConfig",
			function(e, t, n, r, i, l) {
				t.$watch(n.overrides, function(d) {
					var o = l.templates[n.name];
					d && a.isObject(d) && d[n.name] && i.get(d[n.name]) && (o = d[n.name]);
					var s = i.get(o);
					r.html(s), e(r.contents())(t)
				})
			}
		]).directive("mwlDynamicDirectiveTemplate", function() {
			return {
				restrict: "A",
				controller: "MwlDynamicDirectiveTemplateCtrl"
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlElementDimensionsCtrl", [
			"$element", "$scope", "$parse", "$attrs", "$window",
			function(e, t, n, r, i) {
				function l() {
					n(r.mwlElementDimensions).assign(t, {
						width: e[0].offsetWidth,
						height: e[0].offsetHeight
					}), t.$applyAsync()
				}
				var d = a.element(i);
				d.bind("resize", l), l(), t.$on("$destroy", function() {
					d.unbind("resize", l)
				})
			}
		]).directive("mwlElementDimensions", function() {
			return {
				restrict: "A",
				controller: "MwlElementDimensionsCtrl"
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").controller("MwlResizableCtrl", ["$element",
			"$scope", "$parse", "$attrs", "$timeout", "interact",
			function(e, t, n, r, i, l) {
				function d(e, t) {
					var n = {};
					return n.edge = e, "start" === e ? (n.x = t.data("x"), n.y = t.data(
						"y")) : "end" === e && (n.x = parseFloat(t.css("width").replace(
						"px", "")) - v.width, n.y = parseFloat(t.css("height").replace(
						"px", "")) - v.height), n
				}
				if (l) {
					var o, s;
					r.snapGrid && (s = n(r.snapGrid)(t), o = {
						targets: [l.createSnapGrid(s)]
					});
					var c, v = {},
						m = {};
					l(e[0]).resizable({
						edges: n(r.resizeEdges)(t),
						snap: o,
						onstart: function(e) {
							c = "end";
							var t = a.element(e.target);
							v.height = t[0].offsetHeight, v.width = t[0].offsetWidth, m.height =
								t.css("height"), m.width = t.css("width")
						},
						onmove: function(e) {
							if (e.rect.width > 0 && e.rect.height > 0) {
								var i = a.element(e.target),
									l = parseFloat(i.data("x") || 0),
									o = parseFloat(i.data("y") || 0);
								i.css({
									width: e.rect.width + "px",
									height: e.rect.height + "px"
								}), l += e.deltaRect.left, o += e.deltaRect.top, i.css(
									"transform", "translate(" + l + "px," + o + "px)"), i.data(
									"x", l), i.data("y", o), (0 !== e.deltaRect.left || 0 !== e.deltaRect
									.top) && (c = "start"), r.onResize && (n(r.onResize)(t, d(c,
									i)), t.$apply())
							}
						},
						onend: function(e) {
							var l = a.element(e.target),
								o = d(c, l);
							i(function() {
								l.data("x", null).data("y", null).css({
									transform: "",
									width: m.width,
									height: m.height
								})
							}), r.onResizeEnd && (n(r.onResizeEnd)(t, o), t.$apply())
						}
					}), t.$watch(r.mwlResizable, function(t) {
						l(e[0]).resizable({
							enabled: t
						})
					}), t.$on("$destroy", function() {
						l(e[0]).unset()
					})
				}
			}
		]).directive("mwlResizable", function() {
			return {
				restrict: "A",
				controller: "MwlResizableCtrl"
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").filter("calendarDate", ["calendarHelper",
			"calendarConfig",
			function(e, t) {
				function n(n, a, r) {
					return r === !0 && (a = t.dateFormats[a]), e.formatDate(n, a)
				}
				return n.$stateful = !0, n
			}
		])
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").filter("calendarLimitTo", ["limitToFilter",
			function(e) {
				return a.version.minor >= 4 ? e : function(e, t, n) {
					return t = Math.abs(Number(t)) === 1 / 0 ? Number(t) : parseInt(t),
						isNaN(t) ? e : (a.isNumber(e) && (e = e.toString()), a.isArray(e) ||
							a.isString(e) ? (n = !n || isNaN(n) ? 0 : parseInt(n), n = 0 > n &&
								n >= -e.length ? e.length + n : n, t >= 0 ? e.slice(n, n + t) :
								0 === n ? e.slice(t, e.length) : e.slice(Math.max(0, n + t), n)) :
							e)
				}
			}
		])
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").filter("calendarTruncateEventTitle", function() {
			return function(e, t, n) {
				return e ? e.length >= t && e.length / 20 > n / 30 ? e.substr(0, t) +
					"..." : e : ""
			}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").filter("calendarTrustAsHtml", ["$sce", function(
			e) {
			return function(t) {
				return e.trustAsHtml(t)
			}
		}])
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").constant("calendarConfig", {
			allDateFormats: {
				angular: {
					date: {
						hour: "ha",
						day: "d MMM",
						month: "MMMM",
						weekDay: "EEEE",
						time: "HH:mm",
						datetime: "MMM d, h:mm a"
					},
					title: {
						day: "EEEE d MMMM, yyyy",
						week: "Week {week} of {year}",
						month: "MMMM yyyy",
						year: "yyyy"
					}
				},
				moment: {
					date: {
						hour: "ha",
						day: "D MMM",
						month: "MMMM",
						weekDay: "dddd",
						time: "HH:mm",
						datetime: "MMM D, h:mm a"
					},
					title: {
						day: "dddd D MMMM, YYYY",
						week: "Week {week} of {year}",
						month: "MMMM YYYY",
						year: "YYYY"
					}
				}
			},
			get dateFormats() {
				return this.allDateFormats[this.dateFormatter].date
			},
			get titleFormats() {
				return this.allDateFormats[this.dateFormatter].title
			},
			dateFormatter: "angular",
			showTimesOnWeekView: !1,
			displayAllMonthEvents: !1,
			i18nStrings: {
				weekNumber: "Week {week}"
			},
			templates: {}
		})
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").factory("calendarEventTitle", [
			"calendarDateFilter", "calendarTruncateEventTitleFilter",
			function(e, t) {
				function n(t) {
					return t.title + " (" + e(t.startsAt, "datetime", !0) + ")"
				}

				function a(t) {
					return t.title + " (" + e(t.startsAt, "time", !0) + ")"
				}

				function r(t) {
					return e(t.startsAt, "time", !0) + " - " + t.title
				}

				function i(e) {
					return e.title
				}

				function l(e) {
					return e.title
				}

				function d(e) {
					return e.allDay ? e.title : t(e.title, 20, e.height)
				}
				return {
					yearView: n,
					monthView: a,
					monthViewTooltip: r,
					weekView: i,
					weekViewTooltip: l,
					dayView: d
				}
			}
		])
	}, function(e, t, n) {
		"use strict";
		var a = n(1),
			r = n(3);
		a.module("mwl.calendar").factory("calendarHelper", ["$q",
			"$templateRequest", "dateFilter", "moment", "calendarConfig",
			function(e, t, n, a, i) {
				function l(e, t) {
					if ("angular" === i.dateFormatter) return n(a(e).toDate(), t);
					if ("moment" === i.dateFormatter) return a(e).format(t);
					throw new Error("Unknown date formatter: " + i.dateFormatter)
				}

				function d(e, t, n) {
					if (!n) return n;
					var r = a(t).diff(a(e));
					return a(n).add(r)
				}

				function o(e, t, n) {
					var r = a(e.start),
						i = a(e.end),
						l = a(n);
					if (t) {
						switch (t) {
							case "year":
								r.set({
									year: l.year()
								});
								break;
							case "month":
								r.set({
									year: l.year(),
									month: l.month()
								});
								break;
							default:
								throw new Error("Invalid value (" + t +
									") given for recurs on. Can only be year or month.")
						}
						i = d(e.start, r, i)
					}
					return {
						start: r,
						end: i
					}
				}

				function s(e, t, n) {
					t = a(t), n = a(n);
					var r = o({
							start: e.startsAt,
							end: e.endsAt || e.startsAt
						}, e.recursOn, t),
						i = r.start,
						l = r.end;
					return i.isAfter(t) && i.isBefore(n) || l.isAfter(t) && l.isBefore(n) ||
						i.isBefore(t) && l.isAfter(n) || i.isSame(t) || l.isSame(n)
				}

				function c(e, t, n) {
					return e.filter(function(e) {
						return s(e, t, n)
					})
				}

				function v(e, t, n) {
					var r = a(e).startOf(t),
						i = a(e).endOf(t);
					return c(n, r, i)
				}

				function m(e) {
					return e.filter(function(e) {
						return e.incrementsBadgeTotal !== !1
					}).length
				}

				function u() {
					for (var e = [], t = 0; 7 > t;) e.push(l(a().weekday(t++), i.dateFormats
						.weekDay));
					return e
				}

				function f(e, t, n) {
					for (var r = [], d = v(t, "year", e), o = a(t).startOf("year"), s =
							0; 12 > s;) {
						var u = o.clone(),
							f = u.clone().endOf("month"),
							p = c(d, u, f),
							w = {
								label: l(u, i.dateFormats.month),
								isToday: u.isSame(a().startOf("month")),
								events: p,
								date: u,
								badgeTotal: m(p)
							};
						n({
							calendarCell: w
						}), r.push(w), o.add(1, "month"), s++
					}
					return r
				}

				function p(e, t, n) {
					var r, l = a(t).startOf("month"),
						d = l.clone().startOf("week"),
						o = a(t).endOf("month").endOf("week");
					r = i.displayAllMonthEvents ? c(e, d, o) : c(e, l, l.clone().endOf(
						"month"));
					for (var s = [], v = a().startOf("day"); d.isBefore(o);) {
						var u = d.month() === a(t).month(),
							f = [];
						(u || i.displayAllMonthEvents) && (f = c(r, d, d.clone().endOf(
							"day")));
						var p = {
							label: d.date(),
							date: d.clone(),
							inMonth: u,
							isPast: v.isAfter(d),
							isToday: v.isSame(d),
							isFuture: v.isBefore(d),
							isWeekend: [0, 6].indexOf(d.day()) > -1,
							events: f,
							badgeTotal: m(f)
						};
						n({
							calendarCell: p
						}), s.push(p), d.add(1, "day")
					}
					return s
				}

				function w(e, t) {
					for (var n = a(t).startOf("week"), d = a(t).endOf("week"), s = n.clone(),
							v = [], m = a().startOf("day"); v.length < 7;) v.push({
						weekDayLabel: l(s, i.dateFormats.weekDay),
						date: s.clone(),
						dayLabel: l(s, i.dateFormats.day),
						isPast: s.isBefore(m),
						isToday: s.isSame(m),
						isFuture: s.isAfter(m),
						isWeekend: [0, 6].indexOf(s.day()) > -1
					}), s.add(1, "day");
					var u = r.getWeekView({
						viewDate: t,
						events: c(e, n, d).map(function(e) {
							var t = a(n).startOf("day"),
								r = o({
									start: a(e.startsAt).startOf("day"),
									end: a(e.endsAt || e.startsAt).startOf("day").add(1,
										"second")
								}, e.recursOn, t);
							return r.originalEvent = e, r
						})
					}).map(function(e) {
						return e.row = e.row.map(function(e) {
							return e.event = e.event.originalEvent, e
						}), e
					});
					return {
						days: v,
						eventRows: u
					}
				}

				function h(e, t, n, r, i) {
					var l = a(n || "00:00", "HH:mm").hours(),
						d = a(r || "23:00", "HH:mm").hours(),
						o = 60 / i * 30,
						v = a(t).startOf("day").add(l, "hours"),
						m = a(t).startOf("day").add(d + 1, "hours"),
						u = (d - l + 1) * o,
						f = o / 60,
						p = [],
						w = c(e, a(t).startOf("day").toDate(), a(t).endOf("day").toDate());
					return w.map(function(e) {
						if (a(e.startsAt).isBefore(v) ? e.top = 0 : e.top = a(e.startsAt)
							.startOf("minute").diff(v.startOf("minute"), "minutes") * f - 2,
							a(e.endsAt || e.startsAt).isAfter(m)) e.height = u - e.top;
						else {
							var t = e.startsAt;
							a(e.startsAt).isBefore(v) && (t = v.toDate()), e.endsAt ? e.height =
								a(e.endsAt).diff(a(t), "minutes") * f : e.height = 30
						}
						return e.top - e.height > u && (e.height = 0), e.left = 0, e
					}).filter(function(e) {
						return e.height > 0
					}).map(function(e) {
						var t = !0;
						return p.forEach(function(n, a) {
							var r = !0;
							n.filter(function(e) {
								return !e.allDay
							}).forEach(function(t) {
								(s(e, t.startsAt, t.endsAt || t.startsAt) || s(t, e.startsAt,
									e.endsAt || e.startsAt)) && (r = !1)
							}), r && t && (t = !1, e.left = 150 * a, p[a].push(e))
						}), t && (e.left = 150 * p.length, p.push([e])), e
					})
				}

				function g(e, t, n, i, l) {
					var d = w(e, t),
						o = [],
						s = [];
					return d.eventRows.forEach(function(e) {
						e.row.forEach(function(e) {
							s.push(e.event)
						})
					}), d.days.forEach(function(e) {
						var t = s.filter(function(t) {
								return a(t.startsAt).startOf("day").isSame(a(e.date).startOf(
									"day"))
							}),
							r = h(t, e.date, n, i, l);
						o = o.concat(r)
					}), d.eventRows = [{
						row: o.map(function(e) {
							return {
								event: e,
								offset: r.getDayOffset({
									start: e.startsAt,
									end: e.endsAt
								}, a(t).startOf("week"))
							}
						})
					}], d
				}

				function y(e, t, n) {
					var r = a(e || "00:00", "HH:mm"),
						i = a(t || "23:00", "HH:mm"),
						l = 60 / n * 30;
					return (i.diff(r, "hours") + 1) * l + 2
				}

				function D() {
					var n = Object.keys(i.templates).map(function(e) {
						var n = i.templates[e];
						return t(n)
					});
					return e.all(n)
				}
				return {
					getWeekDayNames: u,
					getYearView: f,
					getMonthView: p,
					getWeekView: w,
					getDayView: h,
					getWeekViewWithTimes: g,
					getDayViewHeight: y,
					adjustEndDateFromStartDiff: d,
					formatDate: l,
					loadTemplates: D,
					eventIsInPeriod: s
				}
			}
		])
	}, function(e, t, n) {
		"use strict";
		var a = n(1);
		a.module("mwl.calendar").factory("calendarTitle", ["moment",
			"calendarConfig", "calendarHelper",
			function(e, t, n) {
				function a(e) {
					return n.formatDate(e, t.titleFormats.day)
				}

				function r(n) {
					return t.titleFormats.week.replace("{week}", e(n).isoWeek()).replace(
						"{year}", e(n).startOf("week").format("YYYY"))
				}

				function i(e) {
					return n.formatDate(e, t.titleFormats.month)
				}

				function l(e) {
					return n.formatDate(e, t.titleFormats.year)
				}
				return {
					day: a,
					week: r,
					month: i,
					year: l
				}
			}
		])
	}, function(e, t, n) {
		"use strict";
		var a, r = n(1);
		try {
			a = n(43)
		} catch (i) {
			a = null
		}
		r.module("mwl.calendar").constant("interact", a)
	}, function(e, t, n) {
		"use strict";
		var a = n(1),
			r = n(2);
		a.module("mwl.calendar").constant("moment", r)
	}, function(e, t, n) {
		function a(e) {
			return n(r(e))
		}

		function r(e) {
			return i[e] || function() {
				throw new Error("Cannot find module '" + e + "'.")
			}()
		}
		var i = {
			"./mwlCalendar.js": 14,
			"./mwlCalendarDay.js": 15,
			"./mwlCalendarHourList.js": 16,
			"./mwlCalendarMonth.js": 17,
			"./mwlCalendarSlideBox.js": 18,
			"./mwlCalendarWeek.js": 19,
			"./mwlCalendarYear.js": 20,
			"./mwlCollapseFallback.js": 21,
			"./mwlDateModifier.js": 22,
			"./mwlDragSelect.js": 23,
			"./mwlDraggable.js": 24,
			"./mwlDroppable.js": 25,
			"./mwlDynamicDirectiveTemplate.js": 26,
			"./mwlElementDimensions.js": 27,
			"./mwlResizable.js": 28
		};
		a.keys = function() {
			return Object.keys(i)
		}, a.resolve = r, e.exports = a, a.id = 39
	}, function(e, t, n) {
		function a(e) {
			return n(r(e))
		}

		function r(e) {
			return i[e] || function() {
				throw new Error("Cannot find module '" + e + "'.")
			}()
		}
		var i = {
			"./calendarDate.js": 29,
			"./calendarLimitTo.js": 30,
			"./calendarTruncateEventTitle.js": 31,
			"./calendarTrustAsHtml.js": 32
		};
		a.keys = function() {
			return Object.keys(i)
		}, a.resolve = r, e.exports = a, a.id = 40
	}, function(e, t, n) {
		function a(e) {
			return n(r(e))
		}

		function r(e) {
			return i[e] || function() {
				throw new Error("Cannot find module '" + e + "'.")
			}()
		}
		var i = {
			"./calendarConfig.js": 33,
			"./calendarEventTitle.js": 34,
			"./calendarHelper.js": 35,
			"./calendarTitle.js": 36,
			"./interact.js": 37,
			"./moment.js": 38
		};
		a.keys = function() {
			return Object.keys(i)
		}, a.resolve = r, e.exports = a, a.id = 41
	}, function(e, t, n) {
		function a(e) {
			return n(r(e))
		}

		function r(e) {
			return i[e] || function() {
				throw new Error("Cannot find module '" + e + "'.")
			}()
		}
		var i = {
			"./calendar.html": 5,
			"./calendarDayView.html": 6,
			"./calendarHourList.html": 7,
			"./calendarMonthCell.html": 8,
			"./calendarMonthCellEvents.html": 9,
			"./calendarMonthView.html": 10,
			"./calendarSlideBox.html": 11,
			"./calendarWeekView.html": 12,
			"./calendarYearView.html": 13
		};
		a.keys = function() {
			return Object.keys(i)
		}, a.resolve = r, e.exports = a, a.id = 42
	}, function(e, t) {
		if ("undefined" == typeof n) {
			var a = new Error('Cannot find module "undefined"');
			throw a.code = "MODULE_NOT_FOUND", a
		}
		e.exports = n
	}])
});
// sourceMappingURL=angular-bootstrap-calendar-tpls.min.js.map