package io.github.yu.base.service.impl;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.base.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.List;

public abstract class BaseServiceImpl<T, Q extends T, M extends BaseMapper<T, Q>>
        implements BaseService<T, Q> {
    @Autowired
    protected M mapper;

    public void insert(T t) {
        this.mapper.insert(t);
    }

    public void deleteById(Serializable id) {
        this.mapper.deleteById(id);
    }

    public void deleteByName(Serializable name) {
        this.mapper.deleteByName(name);
    }

    public void updateById(T t) {
        this.mapper.updateById(t);
    }

    public T getById(Serializable id) {
        return this.mapper.getById(id);
    }

    @Override
    public T getByEntity(T t) {
        return this.mapper.getByEntity(t);
    }

    public T getByName(Serializable name) {
        return this.mapper.getByName(name);
    }

    public List<T> list() {
        return this.mapper.list();
    }

    @Override
    public List<T> listByEntity(T t) {
        return this.mapper.listByEntity(t);
    }

    @Override
    public List<T> listByQuery(Q query) {
        return this.mapper.listByQuery(query);
    }

    public List<T> page() {
        return this.mapper.page();
    }

    public List<T> pageByQuery(Q query) {
        return this.mapper.pageByQuery(query);
    }
}
