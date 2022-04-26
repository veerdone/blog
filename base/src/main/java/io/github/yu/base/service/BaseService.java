package io.github.yu.base.service;


import io.github.yu.base.mapper.BaseMapper;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T, Q extends T> {
    void insert(T t);

    void deleteById(Serializable id);

    void deleteByName(Serializable name);

    void updateById(T t);

    T getById(Serializable id);

    T getByEntity(T t);

    T getByName(Serializable name);

    List<T> list();

    List<T> listByEntity(T t);

    List<T> listByQuery(Q query);

    List<T> page();

    List<T> pageByQuery(Q query);
}
