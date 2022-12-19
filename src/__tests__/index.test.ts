import {jsonLogic} from '../index';

const ALMOST_YEAR = 364;

describe('json-logic-graphql', () => {
    describe('_isPastDate', () => {
        it('returns true if date is in the past', () => {
            const result = jsonLogic.apply({_isPastDate: '1500-01-01'});

            expect(result).toEqual(true);
        });

        it('returns false if date is not in the past', () => {
            const result = jsonLogic.apply({_isPastDate: '2500-01-01'});

            expect(result).toEqual(false);
        });
    });

    describe('_isFutureDate', () => {
        it('returns true if date is in the future', () => {
            const result = jsonLogic.apply({_isFutureDate: '01/01/2500'});

            expect(result).toEqual(true);
        });

        it('returns false if date is not in the future', () => {
            const result = jsonLogic.apply({_isFutureDate: '01/01/1500'});

            expect(result).toEqual(false);
        });
    });

    describe('_getDate', () => {
        it('returns ISO date', () => {
            const result = jsonLogic.apply({_getDate: '01/01/1500'});

            expect(result).toEqual('1499-12-31T23:02:16.000Z');
        });
    });

    describe('_gteDate', () => {
        it('returns true if date diff is over a year', () => {
            const result = jsonLogic.apply(
                {
                    _gteDate: [
                        [
                            {
                                var: 'from',
                            },
                            {
                                var: 'to',
                            },
                        ],
                        [ALMOST_YEAR, 'days'],
                    ],
                },
                {from: '1500-01-01', to: '1600-01-01'}
            );

            expect(result).toEqual(true);
        });

        it('returns true if date diff is exactly almost a year', () => {
            const result = jsonLogic.apply(
                {
                    _gteDate: [
                        [
                            {
                                var: 'from',
                            },
                            {
                                var: 'to',
                            },
                        ],
                        [ALMOST_YEAR, 'days'],
                    ],
                },
                {from: '1600-01-01', to: '1600-12-30'}
            );

            expect(result).toEqual(true);
        });

        it('returns false if date diff is negative', () => {
            const result = jsonLogic.apply(
                {
                    _gteDate: [
                        [
                            {
                                var: 'from',
                            },
                            {
                                var: 'to',
                            },
                        ],
                        [ALMOST_YEAR, 'days'],
                    ],
                },
                {from: '1700-01-01', to: '1600-01-01'}
            );

            expect(result).toEqual(false);
        });
    });

    describe('_gtDate', () => {
        it('returns false if date diff is exactly almost a year', () => {
            const result = jsonLogic.apply(
                {
                    _gtDate: [
                        [
                            {
                                var: 'from',
                            },
                            {
                                var: 'to',
                            },
                        ],
                        [ALMOST_YEAR, 'days'],
                    ],
                },
                {from: '1600-01-01', to: '1600-12-30'}
            );

            expect(result).toEqual(false);
        });

        it('throws error on invalid date(s)', () => {
            expect(() => {
                jsonLogic.apply(
                    {
                        _gtDate: [
                            [
                                {
                                    var: 'from',
                                },
                                {
                                    var: 'to',
                                },
                            ],
                            [ALMOST_YEAR, 'days'],
                        ],
                    },
                    {from: '1600-01-01', to: 'yolo'}
                );
            }).toThrowError('Invalid date in one of these strings: 1600-01-01,yolo');
        });
    });

    describe('Custom operators', () => {
        describe('Custom', () => {
            it('nonZeroMin', () => {
                const logic = {_nonZeroMin: [[100, 0, 30]]}
                expect(jsonLogic.apply(logic)).toEqual(30)
            })

            it('nonZeroMax', () => {
                const logic = {_nonZeroMax: [[100, 0, 30]]}
                expect(jsonLogic.apply(logic)).toEqual(100)
            })
        })
    })

    describe('Moment operators', () => {
        describe('Dates', () => {
            it('_isPastDate', () => {
                const rules = {
                    _isPastDate: [{var: 'date'}],
                }
                const data = {date: '2020-10-01'}

                expect(jsonLogic.apply(rules, data)).toEqual(true)
            })

            it('_isFutureDate', () => {
                const rules = {
                    _isFutureDate: [{var: 'date'}],
                }
                const data = {date: '2080-10-01'}

                expect(jsonLogic.apply(rules, data)).toEqual(true)
            })

            it('_gteDate', () => {
                const rules = {
                    _gteDate: [
                        [{var: 'from'}, {var: 'to'}],
                        [364, 'days'],
                    ],
                }
                const data = {from: '2020-10-01', to: '2021-10-01'}

                expect(jsonLogic.apply(rules, data)).toEqual(true)
            })

            it('_gtDate', () => {
                const rules = {
                    _lteDate: [
                        [{var: 'from'}, {var: 'to'}],
                        [364, 'days'],
                    ],
                }
                const data = {
                    from: '2020-10-01',
                    to: '2020-11-01',
                }

                expect(jsonLogic.apply(rules, data)).toEqual(true)
            })

            it('_lteDate', () => {
                const rules = {
                    _lteDate: [
                        [{var: 'from'}, {var: 'to'}],
                        [364, 'days'],
                    ],
                }
                const data = {
                    from: '2020-10-01',
                    to: '2020-11-01',
                }

                expect(jsonLogic.apply(rules, data)).toEqual(true)
            })

            it('_ltDate', () => {
                const rules = {
                    _ltDate: [
                        [{var: 'from'}, {var: 'to'}],
                        [364, 'days'],
                    ],
                }
                const data = {
                    from: '2020-10-01',
                    to: '2020-11-01',
                }

                expect(jsonLogic.apply(rules, data)).toEqual(true)
            })

            it('_eqDate', () => {
                const rules = {
                    _eqDate: [
                        [{var: 'from'}, {var: 'to'}],
                        [1, 'days'],
                    ],
                }
                const data = {
                    from: '2020-10-01',
                    to: '2020-10-02',
                }

                expect(jsonLogic.apply(rules, data)).toEqual(true)
            })
        })
    })

    describe('operators', () => {
        it('isEqual', () => {
            const logicTrue = {
                _isEqual: [1, 1],
            }
            const logicFalse = {
                _isEqual: ['foo', 'bar'],
            }
            expect(jsonLogic.apply(logicTrue)).toEqual(true)
            expect(jsonLogic.apply(logicFalse)).toEqual(false)
        })

        it('_neq', () => {
            const logicTrue = {
                _neq: ['foo', 'bar'],
            }

            const logicFalse = {
                _neq: [1, 1],
            }

            expect(jsonLogic.apply(logicTrue)).toEqual(true)
            expect(jsonLogic.apply(logicFalse)).toEqual(false)
        })
    })
    describe('Math', () => {
        it('add', () => {
            const logic = {_add: [2, 3]}
            expect(jsonLogic.apply(logic)).toEqual(5)
        })
        it('ceil', () => {
            const logic = {_ceil: [4.006]}
            expect(jsonLogic.apply(logic)).toEqual(5)
        })
        it('divide', () => {
            const logic = {_divide: [6, 3]}
            expect(jsonLogic.apply(logic)).toEqual(2)
        })
        it('floor', () => {
            const logic = {_floor: [4.906]}
            expect(jsonLogic.apply(logic)).toEqual(4)
        })
        it('max', () => {
            const logic = {_max: [[2, 5, 6, 3]]}
            expect(jsonLogic.apply(logic)).toEqual(6)
        })
        it('maxBy', () => {
            const data = [{n: 4}, {n: 2}, {n: 8}, {n: 6}]
            const logic1 = {_maxBy: [{var: ''}, 'n']}
            const logic2 = {_maxBy: [{var: ''}, {_property: 'n'}]}
            expect(jsonLogic.apply(logic1, data)).toEqual(data[2])
            expect(jsonLogic.apply(logic2, data)).toEqual(data[2])
        })
        it('mean', () => {
            const logic = {_mean: [[2, 5, 6, 3]]}
            expect(jsonLogic.apply(logic)).toEqual(4)
        })
        it('meanBy', () => {
            const data = [{n: 4}, {n: 2}, {n: 8}, {n: 6}]
            const logic1 = {_meanBy: [{var: ''}, 'n']}
            const logic2 = {_meanBy: [{var: ''}, {_property: 'n'}]}
            expect(jsonLogic.apply(logic1, data)).toEqual(5)
            expect(jsonLogic.apply(logic2, data)).toEqual(5)
        })
        it('min', () => {
            const logic = {_min: [[2, 5, 6, 3]]}
            expect(jsonLogic.apply(logic)).toEqual(2)
        })
        it('minBy', () => {
            const data = [{n: 4}, {n: 2}, {n: 8}, {n: 6}]
            const logic1 = {_minBy: [{var: ''}, 'n']}
            const logic2 = {_minBy: [{var: ''}, {_property: 'n'}]}
            expect(jsonLogic.apply(logic1, data)).toEqual(data[1])
            expect(jsonLogic.apply(logic2, data)).toEqual(data[1])
        })
        it('multiply', () => {
            const logic = {_multiply: [2, 3]}
            expect(jsonLogic.apply(logic)).toEqual(6)
        })
        it('round', () => {
            const logic1 = {_round: [4.006]}
            const logic2 = {_round: [4.906]}
            expect(jsonLogic.apply(logic1)).toEqual(4)
            expect(jsonLogic.apply(logic2)).toEqual(5)
        })
        it('multiply', () => {
            const logic = {_multiply: [2, 3]}
            expect(jsonLogic.apply(logic)).toEqual(6)
        })
        it('subtract', () => {
            const logic = {_subtract: [2, 3]}
            expect(jsonLogic.apply(logic)).toEqual(-1)
        })
        it('sum', () => {
            const logic = {_sum: [[2, 3]]}
            expect(jsonLogic.apply(logic)).toEqual(5)
        })
        it('sumBy', () => {
            const data = [{n: 4}, {n: 2}, {n: 8}, {n: 6}]
            const logic1 = {_sumBy: [{var: ''}, 'n']}
            const logic2 = {_sumBy: [{var: ''}, {_property: 'n'}]}
            expect(jsonLogic.apply(logic1, data)).toEqual(20)
            expect(jsonLogic.apply(logic2, data)).toEqual(20)
        })
    })
    describe('Util', () => {
        it('property', () => {
            const data = [{a: {b: 2}}, {a: {b: 1}}]
            const logic = {_sumBy: [{var: ''}, {_property: 'a.b'}]}
            expect(jsonLogic.apply(logic, data)).toEqual(3)
        })
    })
});
